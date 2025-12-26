# Fix Frontend-Backend Connection

Your backend is running on Render ✅, but the frontend can't connect because the environment variable isn't set.

## Quick Fix Steps:

### Step 1: Get Your Render Service URL
1. Go to your Render dashboard
2. Click on your `f1-hub-api` service
3. Copy the service URL (it should look like: `https://f1-hub-api.onrender.com` or `https://f1-hub-api-xxxx.onrender.com`)
4. Test it: Visit the URL in your browser, you should see: `{"status":"ok","message":"F1 Hub API is running",...}`

### Step 2: Get Your Vercel URL
1. Go to your Vercel dashboard
2. Click on your project
3. Copy the deployment URL (e.g., `https://turbo-folio.vercel.app` or `https://your-app.vercel.app`)

### Step 3: Update Render CORS Settings
1. In Render dashboard → Your service → **Environment** tab
2. Find or add the `ALLOWED_ORIGINS` variable
3. Set it to: `https://YOUR-VERCEL-URL.vercel.app,http://localhost:3000`
   - Replace `YOUR-VERCEL-URL` with your actual Vercel URL (no trailing slash)
   - Example: `https://turbo-folio.vercel.app,http://localhost:3000`
4. Click **Save Changes** (this will trigger a redeploy)

### Step 4: Add Environment Variable to Vercel
1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Click **Add New**
4. Add:
   - **Key**: `NEXT_PUBLIC_F1_API_BASE`
   - **Value**: Your Render URL (e.g., `https://f1-hub-api.onrender.com`)
   - **Environment**: Check all (Production, Preview, Development)
5. Click **Save**

### Step 5: Redeploy Vercel
1. After adding the environment variable, go to **Deployments** tab in Vercel
2. Click the **⋯** (three dots) on your latest deployment
3. Click **Redeploy**
   - OR commit a small change and push to trigger auto-deploy
   - OR the environment variable will apply on next deployment

### Step 6: Test
1. Visit your Vercel site
2. Open the F1 HUB widget
3. Try clicking "Session Summary" or any quick action
4. The error should be gone and data should load!

## Still Not Working?

### Check CORS in Render:
- Make sure `ALLOWED_ORIGINS` has NO trailing slash
- Should be: `https://your-app.vercel.app` (NOT `https://your-app.vercel.app/`)
- Make sure it includes both your Vercel URL and localhost

### Check Environment Variable in Vercel:
- Make sure it's `NEXT_PUBLIC_F1_API_BASE` (exact spelling, with underscores)
- Make sure it's enabled for Production environment
- Make sure you've redeployed after adding it

### Check Browser Console:
- Open browser DevTools (F12) → Console tab
- Look for any CORS errors or network errors
- The error message will help identify the issue

