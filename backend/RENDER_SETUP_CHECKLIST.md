# Render Setup Checklist

Use this checklist when setting up your service in Render dashboard:

## Service Configuration

- [ ] **Name**: `f1-hub-api` (or your preferred name)
- [ ] **Region**: Choose closest to your users (e.g., Oregon for US)
- [ ] **Branch**: `main` (or your default branch)
- [ ] **Root Directory**: `backend` ⚠️ **IMPORTANT!**
- [ ] **Runtime**: `Python 3`
- [ ] **Build Command**: `pip install -r requirements.txt`
- [ ] **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- [ ] **Instance Type**: 
  - Free (for testing) - spins down after inactivity
  - Standard (512MB RAM) - Recommended for better performance

## Environment Variables

Add these in the "Environment" section:

1. **ALLOWED_ORIGINS**
   - Value: `https://your-vercel-app.vercel.app,http://localhost:3000`
   - Replace `your-vercel-app` with your actual Vercel URL
   - Example: `https://turbo-folio.vercel.app,http://localhost:3000`

2. **FASTF1_CACHE_DIR** (optional, defaults to `.fastf1_cache`)
   - Value: `/tmp/.fastf1_cache`

## After Deployment

- [ ] Copy your Render service URL (e.g., `https://f1-hub-api.onrender.com`)
- [ ] Update Vercel environment variable `NEXT_PUBLIC_F1_API_BASE` with this URL
- [ ] Test backend: Visit `https://your-service.onrender.com/`
- [ ] Test docs: Visit `https://your-service.onrender.com/docs`

