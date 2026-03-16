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
