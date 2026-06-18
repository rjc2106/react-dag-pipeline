// frontend/src/toolbar.js
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div style={{ padding: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <DraggableNode type='customInput' label='Input' />
            <DraggableNode type='llm' label='LLM' />
            <DraggableNode type='customOutput' label='Output' />
            <DraggableNode type='text' label='Text' />
            
            {/* Your 5 New Custom Nodes */}
            <DraggableNode type='api' label='API Request' />
            <DraggableNode type='vectorDB' label='Vector DB' />
            <DraggableNode type='condition' label='Condition' />
            <DraggableNode type='note' label='Sticky Note' />
            <DraggableNode type='image' label='Image Gen' />
        </div>
    );
};