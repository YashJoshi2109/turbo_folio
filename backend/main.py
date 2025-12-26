import os
import sys
from typing import Optional, Any
import pandas as pd
import fastf1
from fastf1 import plotting as f1_plotting  # noqa: F401  # future use
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Ensure local imports work when run as a module or script
sys.path.append(os.path.dirname(__file__))
from cache import get_cache, set_cache  # type: ignore  # noqa: E402
from prewarm import start_prewarm  # type: ignore  # noqa: E402


def recursive_dict(obj: Any) -> dict:
    """Convert an object to a recursive dictionary."""
    if hasattr(obj, '__dict__'):
        result = {}
        for key, value in obj.__dict__.items():
            if not key.startswith('_'):
                result[key] = recursive_dict(value)
        return result
    elif isinstance(obj, (list, tuple)):
        return [recursive_dict(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: recursive_dict(v) for k, v in obj.items()}
    else:
        return obj


F1_CACHE_DIR = os.environ.get("FASTF1_CACHE_DIR", ".fastf1_cache")
os.makedirs(F1_CACHE_DIR, exist_ok=True)
fastf1.Cache.enable_cache(F1_CACHE_DIR)

app = FastAPI(title="F1 Hub API", version="0.1.0")


@app.on_event("startup")
def prewarm_cache():
    base_url = os.environ.get("PREWARM_BASE_URL")
    if not base_url:
        # If not provided, skip to avoid hitting a wrong URL
        print("[prewarm] PREWARM_BASE_URL not set; skipping prewarm")
        return
    enabled = os.environ.get("PREWARM_ENABLED", "true").lower() == "true"
    start_prewarm(base_url, enabled=enabled)


@app.get("/")
def root():
    return {"status": "ok", "message": "F1 Hub API is running", "docs": "/docs"}


# Comma-separated list of allowed frontend origins.
# Example value in Render env: "https://your-vercel-url.vercel.app,http://localhost:3000"
allowed_origins = os.environ.get(
    "ALLOWED_ORIGINS",
    "http://localhost:3000",
).split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in allowed_origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _get_session(year: int, round_number: int, session_code: str):
    try:
        session = fastf1.get_session(year, round_number, session_code)
        session.load()
        return session
    except Exception as exc:  # pragma: no cover - simple pass-through
        raise HTTPException(status_code=500, detail=str(exc)) from exc


def _get_current_season() -> int:
    """Get the current F1 season year."""
    from datetime import datetime
    current_year = datetime.now().year
    # F1 season typically runs March-November session, so if we're before March, use previous year
    if datetime.now().month < 3:
        return current_year - 1
    return current_year


@app.get("/standings/drivers")
def driver_standings(year: Optional[int] = None):
    if year is None:
        year = _get_current_season()
    cache_key = f"standings:drivers:{year}"
    cached = get_cache(cache_key)
    if cached:
        return cached
    try:
        # Try Ergast API (lightweight, cached by Ergast)
        import fastf1.ergast as ergast
        e = ergast.Ergast()
        standings = e.get_driver_standings(season=year)
        if standings is not None and len(standings) > 0:
            # Fill NaN values for JSON serialization
            standings = standings.fillna(0)
            payload = {"year": year, "standings": standings.to_dict(orient="records"), "source": "ergast"}
            set_cache(cache_key, payload)
            return payload
    except Exception as ergast_exc:
        # On Render free tier, a heavy FastF1 fallback can easily exceed request timeouts.
        # Instead of doing an expensive session load, return a clear, fast error.
        raise HTTPException(
            status_code=503,
            detail=(
                "Driver standings are temporarily unavailable because the Ergast API could not be reached "
                f"({str(ergast_exc)[:100]}). "
                "Please try again later or use the race schedule and session-level views, which are less heavy."
            ),
        ) from ergast_exc


@app.get("/standings/constructors")
def constructor_standings(year: Optional[int] = None):
    if year is None:
        year = _get_current_season()
    cache_key = f"standings:constructors:{year}"
    cached = get_cache(cache_key)
    if cached:
        return cached
    try:
        # Try Ergast API (lightweight, cached by Ergast)
        import fastf1.ergast as ergast
        e = ergast.Ergast()
        standings = e.get_constructor_standings(season=year)
        if standings is not None and len(standings) > 0:
            # Fill NaN values for JSON serialization
            standings = standings.fillna(0)
            payload = {"year": year, "standings": standings.to_dict(orient="records"), "source": "ergast"}
            set_cache(cache_key, payload)
            return payload
    except Exception as ergast_exc:
        # Avoid heavy FastF1 fallbacks on Render free tier; fail fast with a clear message instead.
        raise HTTPException(
            status_code=503,
            detail=(
                "Constructor standings are temporarily unavailable because the Ergast API could not be reached "
                f"({str(ergast_exc)[:100]}). "
                "Please try again later or explore race schedule and session data instead."
            ),
        ) from ergast_exc


@app.get("/races")
def races(year: Optional[int] = None):
    if year is None:
        year = _get_current_season()
    cache_key = f"races:{year}"
    cached = get_cache(cache_key)
    if cached:
        return cached
    try:
        events = fastf1.get_event_schedule(year, include_testing=False)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    payload = {"year": year, "races": events.to_dict(orient="records")}
    set_cache(cache_key, payload)
    return payload


@app.get("/sessions/{year}/{round_number}/{session_code}")
def session_summary(year: int, round_number: int, session_code: str):
    cache_key = f"session_summary:{year}:{round_number}:{session_code}"
    cached = get_cache(cache_key)
    if cached:
        return cached

    session = _get_session(year, round_number, session_code)
    # Basic summary fields
    info = {
        "event": session.event.EventName,
        "location": session.event.Location,
        "country": session.event.Country,
        "session": session.name,
        "date": session.date.strftime("%Y-%m-%d"),
    }
    results = session.results
    if results is None:
        payload = {"info": info, "results": []}
        set_cache(cache_key, payload)
        return payload
    payload = {"info": info, "results": results.to_dict(orient="records")}
    set_cache(cache_key, payload)
    return payload


@app.get("/sessions/{year}/{round_number}/{session_code}/laps")
def session_laps(year: int, round_number: int, session_code: str, driver: Optional[str] = None):
    session = _get_session(year, round_number, session_code)
    laps = session.laps
    if driver:
        laps = laps.pick_driver(driver)
    # Keep a trimmed set of columns to avoid huge payloads
    cols = ["Driver", "LapNumber", "LapTime", "Sector1Time", "Sector2Time", "Sector3Time", "Stint", "Compound"]
    laps = laps[cols]
    return {"laps": laps.to_dict(orient="records")}


@app.get("/sessions/{year}/{round_number}/{session_code}/tyres")
def session_tyres(year: int, round_number: int, session_code: str):
    session = _get_session(year, round_number, session_code)
    laps = session.laps
    tyre_data = laps[["Driver", "Stint", "Compound", "LapNumber"]]
    return {"tyres": tyre_data.to_dict(orient="records")}


@app.get("/sessions/{year}/{round_number}/{session_code}/weather")
def session_weather(year: int, round_number: int, session_code: str):
    session = _get_session(year, round_number, session_code)
    weather = session.weather_data
    if weather is None:
        return {"weather": []}
    # Keep essential fields only
    cols = ["AirTemp", "TrackTemp", "Humidity", "Pressure", "Rainfall", "WindSpeed", "WindDirection"]
    weather = weather[cols]
    return {"weather": weather.to_dict(orient="records")}


@app.get("/sessions/{year}/{round_number}/{session_code}/metadata")
def session_metadata(year: int, round_number: int, session_code: str):
    session = _get_session(year, round_number, session_code)
    meta = recursive_dict(session.event)
    return {"metadata": meta}


@app.get("/sessions/{year}/{round_number}/{session_code}/telemetry")
def session_telemetry(year: int, round_number: int, session_code: str, driver: Optional[str] = None):
    """Get telemetry data with X/Y positions for track visualization"""
    session = _get_session(year, round_number, session_code)
    try:
        if driver:
            telemetry = session.laps.pick_driver(driver).get_telemetry()
        else:
            # Get telemetry for all drivers (sample to avoid huge payloads)
            all_laps = session.laps
            drivers = all_laps["Driver"].unique()[:5]  # Limit to first 5 drivers
            telemetry_list = []
            for drv in drivers:
                try:
                    tel = all_laps.pick_driver(drv).get_telemetry()
                    tel["Driver"] = drv
                    telemetry_list.append(tel)
                except Exception:
                    continue
            if not telemetry_list:
                return {"telemetry": []}
            telemetry = pd.concat(telemetry_list, ignore_index=True)
        
        # Extract essential columns for visualization
        cols = ["X", "Y", "Speed", "Throttle", "Brake", "DRS", "Gear", "RPM", "Time"]
        if "Driver" in telemetry.columns:
            cols.append("Driver")
        available_cols = [c for c in cols if c in telemetry.columns]
        telemetry = telemetry[available_cols]
        
        # Sample to reduce payload size (every 10th point)
        telemetry = telemetry.iloc[::10]
        
        return {"telemetry": telemetry.to_dict(orient="records")}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.get("/sessions/{year}/{round_number}/{session_code}/track")
def track_layout(year: int, round_number: int, session_code: str):
    """Get track layout coordinates"""
    session = _get_session(year, round_number, session_code)
    try:
        # Get track layout from any driver's telemetry
        laps = session.laps
        if len(laps) == 0:
            return {"track": []}
        first_driver = laps["Driver"].iloc[0]
        telemetry = laps.pick_driver(first_driver).get_telemetry()
        
        # Extract track coordinates
        track_coords = telemetry[["X", "Y"]].drop_duplicates()
        return {"track": track_coords.to_dict(orient="records")}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


@app.get("/sessions/{year}/{round_number}/{session_code}/positions")
def driver_positions(year: int, round_number: int, session_code: str, time: Optional[float] = None):
    """Get driver positions at a specific time (for replay visualization)"""
    session = _get_session(year, round_number, session_code)
    try:
        all_laps = session.laps
        drivers = all_laps["Driver"].unique()
        
        positions = []
        for driver in drivers[:10]:  # Limit to 10 drivers
            try:
                telemetry = all_laps.pick_driver(driver).get_telemetry()
                if len(telemetry) == 0:
                    continue
                
                if time is not None:
                    # Find closest time
                    telemetry["TimeDiff"] = abs(telemetry["Time"].dt.total_seconds() - time)
                    closest = telemetry.loc[telemetry["TimeDiff"].idxmin()]
                else:
                    # Get latest position
                    closest = telemetry.iloc[-1]
                
                positions.append({
                    "Driver": driver,
                    "X": float(closest["X"]),
                    "Y": float(closest["Y"]),
                    "Speed": float(closest.get("Speed", 0)),
                    "LapNumber": int(closest.get("LapNumber", 0)) if "LapNumber" in closest else 0,
                })
            except Exception:
                continue
        
        return {"positions": positions, "time": time}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

