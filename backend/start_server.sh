#!/bin/bash
# Start the F1 Hub Backend Server

cd "$(dirname "$0")"

echo "🚀 Starting F1 Hub Backend Server..."
echo "📍 Server will be available at: http://localhost:8000"
echo "📚 API Documentation: http://localhost:8000/docs"
echo ""

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+"
    exit 1
fi

# Check if dependencies are installed
if ! python3 -c "import fastapi, uvicorn, fastf1" 2>/dev/null; then
    echo "⚠️  Dependencies not found. Installing..."
    python3 -m pip install -r requirements.txt
fi

# Start the server
echo "✅ Starting server..."
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload





