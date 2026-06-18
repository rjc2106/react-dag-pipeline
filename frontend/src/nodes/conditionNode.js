import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id }) => (
    <BaseNode id={id} label="Condition (If/Else)" handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'true', style: { top: '30%' } },
        { type: 'source', position: Position.Right, id: 'false', style: { top: '70%' } }
    ]}>
        <div>Routes logic based on rules.</div>
    </BaseNode>
);