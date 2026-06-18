import { useReactFlow } from 'reactflow';

export const SubmitButton = () => {
    const { getNodes, getEdges } = useReactFlow();

    const handleSubmit = async () => {
        const nodes = getNodes();
        const edges = getEdges();

        try {
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            const data = await response.json();
            alert(`Number of Nodes: ${data.num_nodes}, Number of Edges: ${data.num_edges}, Is DAG: ${data.is_dag}`);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Failed to submit pipeline. Check backend connection.');
        }
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
};