#!/bin/bash

echo "================================="
echo "      Flowlist Setup"
echo "================================="

# Check Docker

if ! command -v docker &> /dev/null
then
echo "❌ Docker is not installed."
echo "Install Docker and run again."
exit 1
fi

# Check Docker Compose

if ! docker compose version &> /dev/null
then
echo "❌ Docker Compose is not installed."
echo "Install Docker Compose and run again."
exit 1
fi

echo "✅ Docker Found"
echo "✅ Docker Compose Found"

# Create backend env file if missing

if [ ! -f "./Server/src/config.env" ]; then
cp ./Server/.env.example ./Server/src/config.env
echo "✅ Created Server/src/config.env"
fi

# Create frontend env file if missing

if [ ! -f "./Client/.env" ]; then
cp ./Client/.env.example ./Client/.env
echo "✅ Created Client/.env"
fi

echo "🚀 Starting Flowlist..."

docker compose up --build -d

echo ""
echo "================================="
echo " Flowlist Running Successfully"
echo "================================="
echo ""
echo "Frontend: http://localhost:5173"
echo "Backend : http://localhost:4000"
echo ""
echo "To stop:"
echo "docker compose down"
echo ""
echo "To view logs:"
echo "docker compose logs -f"
