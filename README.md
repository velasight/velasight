## 🚀 Reproducible Testing Instructions

This project consists of a Python Flask backend (handling webhook routing, graph queries, and AI generation) and a Next.js frontend (handling the voice UI). 

### 1. Backend Spin-Up (Google Cloud VM or Local)
Navigate to the `backend` folder.

**Prerequisites:** * Python 3.10+
* Redis Server installed and running 
* Active Neo4j AuraDB instance and Vapi.ai account.

**Setup:**
1. Install dependencies:
   `pip install -r requirements.txt`
2. Set up your environment variables (Neo4j, Vapi, Google Cloud).
3. Start the orchestrator:
   `python agent.py`
4. Expose the port using ngrok (for Vapi webhooks):
   `ngrok http 8000`

*(Note: A `deploy.sh` script is included to automate GCP infrastructure deployment).*

### 2. Frontend Spin-Up (Next.js)
Navigate to the `frontend` folder.

1. Install Node dependencies:
   `npm install`
2. Start the development server:
   `npm run dev`
3. Open `http://localhost:3000` in your browser. Ensure microphone permissions are granted.
