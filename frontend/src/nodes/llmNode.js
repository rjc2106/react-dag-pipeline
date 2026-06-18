// frontend/src/nodes/llmNode.js
import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
    // 1. We define the specific connection points this LLM node needs
    const handles = [
        { type: 'target', position: Position.Left, id: 'system', style: { top: `${100/3}%` } },
        { type: 'target', position: Position.Left, id: 'prompt', style: { top: `${200/3}%` } },
        { type: 'source', position: Position.Right, id: 'response' }
    ];

    // 2. We pass those handles into your beautiful BaseNode factory
    return (
        <BaseNode id={id} label="LLM Engine" handles={handles}>
            <div style={{ padding: '8px 0' }}>
                <span>This is an LLM.</span>
            </div>
        </BaseNode>
    );
};