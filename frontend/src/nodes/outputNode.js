// frontend/src/nodes/outputNode.js
import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
    const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
    const [outputType, setOutputType] = useState(data.outputType || 'Text');

    const handleNameChange = (e) => setCurrName(e.target.value);
    const handleTypeChange = (e) => setOutputType(e.target.value);

    // Output nodes only need one handle to receive data IN (target, left side)
    const handles = [
        { type: 'target', position: Position.Left, id: 'value' }
    ];

    return (
        <BaseNode id={id} label="Output" handles={handles}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                Name:
                <input 
                    type="text" 
                    value={currName} 
                    onChange={handleNameChange} 
                    style={{ padding: '6px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                Type:
                <select 
                    value={outputType} 
                    onChange={handleTypeChange}
                    style={{ padding: '6px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                >
                    <option value="Text">Text</option>
                    <option value="Image">Image</option>
                </select>
            </label>
        </BaseNode>
    );
};