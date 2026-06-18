// frontend/src/nodes/inputNode.js
import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
    const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
    const [inputType, setInputType] = useState(data.inputType || 'Text');

    const handleNameChange = (e) => setCurrName(e.target.value);
    const handleTypeChange = (e) => setInputType(e.target.value);

    // Input nodes only need one handle to send data OUT (source, right side)
    const handles = [
        { type: 'source', position: Position.Right, id: 'value' }
    ];

    return (
        <BaseNode id={id} label="Input" handles={handles}>
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
                    value={inputType} 
                    onChange={handleTypeChange}
                    style={{ padding: '6px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                >
                    <option value="Text">Text</option>
                    <option value="File">File</option>
                </select>
            </label>
        </BaseNode>
    );
};