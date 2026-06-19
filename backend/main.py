from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any

app = FastAPI()

# This allows your React frontend (localhost:3000) to talk to this Python backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Dict[str, Any]):
    """
    Receives the pipeline JSON data from the frontend, calculates nodes and edges,
    and runs a Depth-First Search (DFS) to determine if it forms a valid DAG.
    """
    try:
        # FastAPI automatically parses the incoming JSON into a Python dictionary!
        nodes = pipeline.get('nodes', [])
        edges = pipeline.get('edges', [])

        num_nodes = len(nodes)
        num_edges = len(edges)

        # 1. Build an Adjacency List to map out the connections
        adj_list = {node['id']: [] for node in nodes}
        for edge in edges:
            source = edge.get('source')
            target = edge.get('target')
            if source in adj_list:
                adj_list[source].append(target)
            else:
                adj_list[source] = [target]

        # 2. Cycle Detection Algorithm (Depth-First Search)
        visited = set()
        rec_stack = set()

        def is_cyclic(curr_node):
            visited.add(curr_node)
            rec_stack.add(curr_node)

            for neighbor in adj_list.get(curr_node, []):
                if neighbor not in visited:
                    if is_cyclic(neighbor):
                        return True
                elif neighbor in rec_stack:
                    return True

            rec_stack.remove(curr_node)
            return False

        is_dag = True
        for node in adj_list:
            if node not in visited:
                if is_cyclic(node):
                    is_dag = False
                    break

        # 3. Return the exact JSON structure the frontend expects
        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag
        }
        
    except Exception as e:
        return {'error': str(e)}