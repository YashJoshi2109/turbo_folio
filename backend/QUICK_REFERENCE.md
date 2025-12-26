# Quick Reference: Render Form Fields

Copy and paste these values into your Render deployment form:

## Required Fields

### Build Command
```
pip install -r requirements.txt
```

### Start Command
```
uvicorn main:app --host 0.0.0.0 --port $PORT
```

## Instance Type
- **Free** (for testing, spins down after inactivity)
- **Standard 512MB RAM** (recommended, better performance)

## Environment Variables

Click "Add Environment Variable" and add:

### 1. ALLOWED_ORIGINS
- **Key**: `ALLOWED_ORIGINS`
- **Value**: `https://YOUR-VERCEL-URL.vercel.app,http://localhost:3000`
  - Replace `YOUR-VERCEL-URL` with your actual Vercel deployment URL
  - Example: `https://turbo-folio.vercel.app,http://localhost:3000`

### 2. FASTF1_CACHE_DIR (Optional)
- **Key**: `FASTF1_CACHE_DIR`
- **Value**: `/tmp/.fastf1_cache`

## Already Set (Don't Change)
✅ Name: `f1-hub-api`
✅ Language: `Python 3`
✅ Branch: `main`
✅ Region: `Oregon (US West)` (or your preferred region)
✅ Root Directory: `backend`

## Project
- **Skip this** for now (you can add it later)

