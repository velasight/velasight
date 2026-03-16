# 🏙️ Velasight: Graph-Native Intelligence for Real Estate

Velasight is an interactive, hybrid, multi-modal voice agent framework designed to act as a CCIM analyst for commercial real estate developers. By combining ultra-low latency voice orchestration with a master property graph, Velasight reduces pre-development market and feasibility friction by bringing deep spatial data to human conversation.

Built for the **Gemini Live Agent Challenge**.

## 🧠 System Architecture

```mermaid
graph TD
    User((User Voice)) <-->|WebRTC| Vapi[Vapi Voice Orchestrator]
    Vapi <--> |Webhook POST| Orchestrator[Velasight Engine: GCP Vertex VM Flask Backend]
    
    subgraph Google Cloud Platform
        Orchestrator --> |Security Scan| ModelArmor[Google Model Armor]
        Orchestrator --> |Playbooks| Gemini[Gemini 2.5 Pro / Synthesis]
        Orchestrator --> |Zoning Docs| Vertex[Vertex AI Datastore]
    end
    
    subgraph Data Stack
        Orchestrator <--> |Fast Facts| Neo4j[(Neo4j AuraDB)]
        Orchestrator <--> |Context Cache| Redis[(Redis Local Memory)]
    end
    
    Orchestrator --> |WebSocket / Poll| Frontend[Next.js Waveform Dashboard]

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
