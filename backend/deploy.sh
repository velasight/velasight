#!/bin/bash
# VELASIGHT - AUTOMATED GCP DEPLOYMENT SCRIPT
echo "🚀 Booting Velasight Infrastructure on Google Cloud..."

# 1. Update environment and install dependencies
sudo apt-get update && sudo apt-get install -y redis-server
pip install -r requirements.txt

# 2. Start Redis Cache Service
sudo systemctl start redis-server
echo "✅ Redis In-Memory Cache Initialized"

# 3. Expose secure tunnel for Voice Webhooks
nohup ngrok http 8000 > /dev/null 2>&1 &
echo "✅ Ngrok Webhook Tunnel Established"

# 4. Launch the Orchestrator Engine
echo "🧠 Starting Velasight Multi-Agent Orchestrator..."
python agent.py
