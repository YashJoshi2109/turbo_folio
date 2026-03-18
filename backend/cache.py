import json
import os
import sqlite3
import time
from typing import Any, Optional

# SQLite-based cache to reduce repeated expensive FastF1 calls on Render/free tier.
# Stores arbitrary JSON-serializable payloads keyed by a string, with an updated_at timestamp.

CACHE_DB_PATH_ENV = os.environ.get("CACHE_DB_PATH")
# Render's filesystem is read-only except /tmp. If a user sets CACHE_DB_PATH to an
# unwritable location (like /data), we automatically fall back to /tmp.
DB_PATH = CACHE_DB_PATH_ENV or ("/tmp/f1cache.db" if os.environ.get("RENDER") else "f1cache.db")
CACHE_TTL_SECONDS = int(os.environ.get("CACHE_TTL_SECONDS", "86400"))  # default 24h


def _resolve_writable_db_path(path: str) -> str:
    directory = os.path.dirname(path) or "."
    # If directory is clearly unwritable (Render), prefer /tmp.
    if directory.startswith("/data"):
        return "/tmp/f1cache.db"
    return path


def _ensure_db():
    global DB_PATH
    DB_PATH = _resolve_writable_db_path(DB_PATH)
    directory = os.path.dirname(DB_PATH) or "."
    try:
        os.makedirs(directory, exist_ok=True)
    except PermissionError:
        DB_PATH = "/tmp/f1cache.db"
        directory = os.path.dirname(DB_PATH) or "."
        os.makedirs(directory, exist_ok=True)

    try:
        conn = sqlite3.connect(DB_PATH)
    except PermissionError:
        DB_PATH = "/tmp/f1cache.db"
        conn = sqlite3.connect(DB_PATH)

    with conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS cache (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL,
                updated_at INTEGER NOT NULL
            )
            """
        )


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

