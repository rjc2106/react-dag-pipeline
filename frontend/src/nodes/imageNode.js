import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ImageNode = ({ id }) => (
    <BaseNode id={id} label="Image Generator" handles={[
        { type: 'target', position: Position.Left, id: 'prompt' },
        { type: 'source', position: Position.Right, id: 'image_url' }
    ]}>
        <div>Creates visuals from text.</div>
    </BaseNode>
);