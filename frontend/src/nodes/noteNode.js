import React from 'react';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id }) => (
    <BaseNode id={id} label="Sticky Note" handles={[]}>
        <div style={{ fontStyle: 'italic', color: '#9ca3af' }}>Leave a comment...</div>
    </BaseNode>
);