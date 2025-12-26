import os
import threading
import time
from typing import List

import requests


def _prewarm_targets(base_url: str, paths: List[str], timeout: int = 120) -> None:
    for path in paths:
        url = f"{base_url.rstrip('/')}/{path.lstrip('/')}"
        try:
            resp = requests.get(url, timeout=timeout)
            # Best-effort: do not raise; just log to stdout
            print(f"[prewarm] {url} -> {resp.status_code}")
        except Exception as exc:  # noqa: BLE001
            print(f"[prewarm] {url} failed: {exc}")
        # brief pause to avoid hammering
        time.sleep(1)


def start_prewarm(base_url: str, enabled: bool = True) -> None:
    if not enabled:
        print("[prewarm] disabled")
        return

    paths = [
        "races?year=2024",
        "standings/drivers?year=2024",
        "standings/constructors?year=2024",
        "sessions/2024/1/FP1",
    ]

    thread = threading.Thread(
        target=_prewarm_targets,
        args=(base_url, paths),
        kwargs={"timeout": int(os.environ.get("PREWARM_TIMEOUT_SECONDS", "120"))},
        daemon=True,
    )
    thread.start()
    print("[prewarm] started background prewarm")

