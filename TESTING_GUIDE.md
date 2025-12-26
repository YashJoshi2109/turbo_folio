# Testing Your Deployment

## Step 1: Verify Environment Variable

### In Browser Console (After deployment):
1. Visit your live Vercel site
2. Open browser DevTools (F12) → Console
3. Type: `console.log(process.env.NEXT_PUBLIC_F1_API_BASE)`
   - Note: This might not work directly in console, but check Network tab instead

### Better Method - Check Network Tab:
1. Open DevTools → Network tab
2. Try clicking a F1 HUB quick action (like "Session Summary")
3. Look for failed requests
4. Check the Request URL - it should show your Render URL, NOT `localhost:8000`
   - ✅ Good: `https://f1-hub-api.onrender.com/sessions/...`
   - ❌ Bad: `http://localhost:8000/sessions/...`

## Step 2: Test Backend Directly

Visit your Render backend URL directly:
- `https://your-render-service.onrender.com/`
- Should see: `{"status":"ok","message":"F1 Hub API is running","docs":"/docs"}`

Visit API docs:
- `https://your-render-service.onrender.com/docs`
- Should see FastAPI interactive documentation

## Step 3: Test from Frontend

1. Go to your live Vercel site
2. Open F1 HUB widget
3. Click "Session Summary" or "Race Schedule"
4. Watch for:
   - ✅ Success: Data loads (may take 30-60 seconds first time)
   - ❌ Error: Check error message type

## Common Issues:

### "Cannot connect to backend server"
- Environment variable not set in Vercel
- Wrong URL in environment variable
- Backend not running (check Render dashboard)

### CORS Error (in browser console)
- `ALLOWED_ORIGINS` in Render doesn't include your Vercel URL
- Check exact URL match (no trailing slash)
- Make sure it's `https://` not `http://`

### Timeout Error
- Normal for first request (30-60 seconds)
- Render free tier has cold starts
- Just wait and try again

### 405 Method Not Allowed
- This is just a health check from Render (normal)
- Your actual API calls should work fine

