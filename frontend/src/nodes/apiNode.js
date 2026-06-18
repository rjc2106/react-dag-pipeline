import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id }) => (
    <BaseNode id={id} label="API Request" handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' }
    ]}>
        <div>Fetches external data.</div>
    </BaseNode>
);