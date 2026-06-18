// frontend/src/nodes/textNode.js
import React, { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
    const [currText, setCurrText] = useState(data?.text || '{{input}}');
    const [variables, setVariables] = useState([]);
    const textareaRef = useRef(null);

    // 1. The Regex Engine: Extract variables wrapped in {{ }}
    useEffect(() => {
        const extractVariables = (text) => {
            const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
            const matches = [];
            let match;
            
            while ((match = regex.exec(text)) !== null) {
                if (!matches.includes(match[1])) {
                    matches.push(match[1]); // Only push unique variables
                }
            }
            return matches;
        };
        
        setVariables(extractVariables(currText));
    }, [currText]);

    // 2. The Auto-Resize Engine
    const handleTextChange = (e) => {
        setCurrText(e.target.value);
        
        // Magically adjust height to fit content without scrollbars
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    // 3. Dynamic Handle Generation
    const handles = [
        // Standard output handle on the right
        { type: 'source', position: Position.Right, id: 'output' },
        
        // Dynamically generate an input handle on the left for every detected variable
        ...variables.map((variable, index) => ({
            type: 'target',
            position: Position.Left,
            id: `var-${variable}`,
            // Mathematically space out the handles so they don't overlap
            style: { top: `${((index + 1) * 100) / (variables.length + 1)}%` }
        }))
    ];

    return (
        <BaseNode id={id} label="Text" handles={handles}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                Text:
                <textarea
                    ref={textareaRef}
                    value={currText}
                    onChange={handleTextChange}
                    style={{
                        padding: '6px',
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
                        resize: 'none', // Prevents the user from manually dragging the corner
                        overflow: 'hidden', // Hides the ugly internal scrollbar
                        minHeight: '40px',
                        fontFamily: 'inherit',
                        fontSize: '12px'
                    }}
                />
            </label>
        </BaseNode>
    );
};