# VectorShift Core: Pipeline DAG Validation Engine

## 📖 Overview
This module handles the visual construction and structural validation of our user-facing LLM/VectorDB pipelines. To prevent execution timeouts and systemic crashes in our backend pipeline runner, this service ensures that any user-constructed graph is a strictly valid **Directed Acyclic Graph (DAG)** before it enters the execution queue. 

## 🏗️ System Architecture
my architecture is strictly decoupled to ensure the pipeline executor remains isolated from UI state:

* **Client Interface (React + React Flow):** Manages the complex state of node interactions and edge connections. It acts purely as a state manager, parsing the visual canvas into a sanitized JSON payload.
* **Validation API (FastAPI + NetworkX):** Acts as the gatekeeper. It consumes the graph payload, constructs an adjacency list, and utilizes a Depth-First Search (DFS) algorithm for cycle detection. 

## 🔒 Security & Local Setup (Strict Requirement)

**Security Notice:** To adhere to my internal security protocols and prevent dependency cross-contamination with other VectorShift microservices, **this application must be run inside an isolated Python virtual environment (`venv`).** Installing dependencies globally poses a security risk to your local development environment.

### 1. Initialize the Validation API (Backend)
Navigate to the `backend` directory, establish the secure environment, and boot the server:

`bash
cd backend

# 1. Create the secure virtual environment
python3 -m venv venv

# 2. Activate the environment (Required)
source venv/bin/activate  

# 3. Install isolated dependencies
pip install fastapi uvicorn networkx pydantic

# 4. Boot the server
uvicorn main:app --reload
`
*The API will mount at `http://127.0.0.1:8000`.*

### 2. Initialize the Client UI (Frontend)
Open a new terminal session, navigate to the `frontend` directory, and start the development server:

`bash
cd frontend
npm install
npm start
`
*The client will mount at `http://localhost:3000`.*

## 🧪 QA & Edge Case Testing
Before pushing changes to the main branch, please manually verify the cycle detection logic via the local UI:

1.  **Positive Case (Healthy Pipeline):** 
    * Construct a linear flow: `Input Node` → `LLM Node` → `Output Node`. 
    * Submit the pipeline. 
    * Expected Result: The server validates the structure and returns `Is DAG: true`.
2.  **Negative Case (Infinite Loop Prevention):** 
    * Construct a cyclical flow: connect two `LLM Nodes` to each other to form a closed loop. 
    * Submit the pipeline. 
    * Expected Result: The DFS algorithm intercepts the cycle and returns `Is DAG: false`, preventing the execution engine from hanging.

    # frontend_technical_assessment by Rohan_Chakrborty