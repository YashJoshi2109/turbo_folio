# F1 Hub Backend API

FastAPI backend server for F1 data and track visualization.

## Quick Start

### Option 1: Using the startup script
```bash
cd backend
./start_server.sh
```

### Option 2: Manual start
```bash
cd backend
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## Server Status

- **API Base URL**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/

## Available Endpoints

### Standings
- `GET /standings/drivers?year=2024` - Driver standings
- `GET /standings/constructors?year=2024` - Constructor standings

### Race Schedule
- `GET /races?year=2024` - Race schedule for a year

### Session Data
- `GET /sessions/{year}/{round}/{session}` - Session summary
- `GET /sessions/{year}/{round}/{session}/laps` - Lap data
- `GET /sessions/{year}/{round}/{session}/tyres` - Tyre data
- `GET /sessions/{year}/{round}/{session}/weather` - Weather data
- `GET /sessions/{year}/{round}/{session}/metadata` - Session metadata

### Track Visualization
- `GET /sessions/{year}/{round}/{session}/track` - Track layout coordinates
- `GET /sessions/{year}/{round}/{session}/positions` - Driver positions
- `GET /sessions/{year}/{round}/{session}/telemetry` - Telemetry data

## Troubleshooting

### Server won't start
1. Check if port 8000 is already in use: `lsof -ti:8000`
2. Kill existing process: `pkill -f "uvicorn main:app"`
3. Install dependencies: `pip install -r requirements.txt`

### Cannot connect from frontend
1. Verify server is running: `curl http://localhost:8000/`
2. Check CORS settings in `main.py` (should allow `http://localhost:3000`)
3. Ensure frontend is using correct API URL: `http://localhost:8000`

### Endpoints return errors
1. First request may take 30-60 seconds (FastF1 caching data)
2. Check server logs: `tail -f /tmp/uvicorn.log`
3. Verify FastF1 cache directory exists: `.fastf1_cache/`

## Dependencies

- Python 3.8+
- FastAPI
- Uvicorn
- FastF1
- Pandas

Install with: `pip install -r requirements.txt`





