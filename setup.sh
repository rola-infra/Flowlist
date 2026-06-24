#!/bin/bash

echo "================================="
echo "      Flowlist Setup"
echo "================================="



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

