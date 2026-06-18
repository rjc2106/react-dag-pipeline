import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const VectorDBNode = ({ id }) => (
    <BaseNode id={id} label="Vector Database" handles={[
        { type: 'target', position: Position.Left, id: 'query' },
        { type: 'source', position: Position.Right, id: 'results' }
    ]}>
        <div>Searches embeddings.</div>
    </BaseNode>
);