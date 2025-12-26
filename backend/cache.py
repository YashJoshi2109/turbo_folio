import json
import os
import sqlite3
import time
from typing import Any, Optional

# SQLite-based cache to reduce repeated expensive FastF1 calls on Render/free tier.
# Stores arbitrary JSON-serializable payloads keyed by a string, with an updated_at timestamp.

DB_PATH = os.environ.get("CACHE_DB_PATH", "f1cache.db")
CACHE_TTL_SECONDS = int(os.environ.get("CACHE_TTL_SECONDS", "86400"))  # default 24h


def _ensure_db():
    os.makedirs(os.path.dirname(DB_PATH) or ".", exist_ok=True)
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS cache (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL,
                updated_at INTEGER NOT NULL
            )
            """
        )
        conn.commit()


def get_cache(key: str, max_age_seconds: Optional[int] = None) -> Optional[Any]:
    """Return cached value if not expired; otherwise None."""
    _ensure_db()
    ttl = CACHE_TTL_SECONDS if max_age_seconds is None else max_age_seconds
    now = int(time.time())
    with sqlite3.connect(DB_PATH) as conn:
        row = conn.execute("SELECT value, updated_at FROM cache WHERE key = ?", (key,)).fetchone()
        if not row:
            return None
        value, updated_at = row
        if now - updated_at > ttl:
            return None
        try:
            return json.loads(value)
        except json.JSONDecodeError:
            return None


def set_cache(key: str, value: Any) -> None:
    """Store value in cache."""
    _ensure_db()
    payload = json.dumps(value, default=str)
    now = int(time.time())
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            "INSERT OR REPLACE INTO cache (key, value, updated_at) VALUES (?, ?, ?)",
            (key, payload, now),
        )
        conn.commit()

