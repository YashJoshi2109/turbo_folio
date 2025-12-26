# Render Deployment Guide

This guide will help you deploy your FastAPI backend to Render.

## Prerequisites

1. Your backend code should be in a Git repository (GitHub, GitLab, or Bitbucket)
2. A Render account (sign up at https://render.com if you haven't already)

## Deployment Steps

### Option 1: Manual Setup (Recommended for First Time)

1. **Connect Your Repository**
   - In Render dashboard, click **"New +"** → **"Web Service"**
   - Connect your Git repository (GitHub/GitLab/Bitbucket)
   - Select the repository containing this backend

2. **Configure the Service**
   - **Name**: `f1-hub-api` (or any name you prefer)
   - **Root Directory**: `backend` (important!)
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: Free tier works, but Standard (512MB RAM) is recommended for better performance

3. **Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add:
   - **Key**: `ALLOWED_ORIGINS`
   - **Value**: `https://your-vercel-app.vercel.app,http://localhost:3000`
     - Replace `your-vercel-app` with your actual Vercel deployment URL
     - Keep localhost for local development
   - **Key**: `FASTF1_CACHE_DIR`
   - **Value**: `/tmp/.fastf1_cache`

4. **Deploy**
   - Click **"Create Web Service"**
   - Render will start building and deploying your service
   - Wait for the deployment to complete (first build may take 5-10 minutes)

5. **Get Your Backend URL**
   - Once deployed, you'll see your service URL (e.g., `https://f1-hub-api.onrender.com`)
   - Copy this URL - you'll need it for the frontend configuration

### Option 2: Using render.yaml (Alternative)

If you prefer using a configuration file:

1. The `render.yaml` file is already in the `backend/` directory
2. In Render dashboard, go to **"Blueprints"** → **"New Blueprint"**
3. Connect your repository and select the `backend/render.yaml` file
4. Render will read the configuration and create the service
5. Still need to set `ALLOWED_ORIGINS` manually in the dashboard

## Configure Frontend (Vercel)

After your backend is deployed:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Key**: `NEXT_PUBLIC_F1_API_BASE`
   - **Value**: `https://your-render-service.onrender.com` (use your actual Render URL)
4. Redeploy your Vercel app for the changes to take effect

## Testing Your Deployment

1. **Backend Health Check**
   - Visit: `https://your-render-service.onrender.com/`
   - Should return: `{"status":"ok","message":"F1 Hub API is running","docs":"/docs"}`

2. **API Documentation**
   - Visit: `https://your-render-service.onrender.com/docs`
   - You should see the FastAPI interactive docs

3. **Test from Frontend**
   - After updating Vercel env vars and redeploying, test the F1 data loading in your portfolio

## Important Notes

⚠️ **Render Free Tier Limitations:**
- Services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds (cold start)
- This is normal and expected behavior

💡 **Tips:**
- Consider upgrading to Render's paid tier if you need:
  - Always-on service (no spin-down)
  - Better performance
  - Faster cold starts
- The FastF1 cache will rebuild on each cold start, which is why first requests take longer

## Troubleshooting

**Build fails:**
- Check that `requirements.txt` is in the `backend/` directory
- Verify Python version compatibility

**CORS errors:**
- Double-check `ALLOWED_ORIGINS` includes your exact Vercel URL (including `https://`)
- Ensure there are no trailing slashes

**Service won't start:**
- Check the logs in Render dashboard
- Verify the start command is correct
- Ensure port is set to `$PORT` (Render provides this automatically)

**Timeout errors:**
- First FastF1 requests can take 60+ seconds (normal behavior)
- Render has a 30-second default timeout on free tier
- You may need to upgrade or implement request queuing for very slow endpoints

