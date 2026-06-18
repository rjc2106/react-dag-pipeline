// frontend/src/nodes/BaseNode.js
import React from 'react';
import { Handle } from 'reactflow';

export const BaseNode = ({ id, label, children, handles = [], style = {} }) => {
    // Premium, modern tech aesthetic styling
    const nodeStyle = {
        width: 240,
        minHeight: 90,
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb', // subtle light gray
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative',
        boxSizing: 'border-box',
        ...style
    };

    const headerStyle = {
        fontWeight: '600',
        fontSize: '13px',
        color: '#1f2937', // dark slate
        borderBottom: '1px solid #f3f4f6',
        paddingBottom: '6px',
        margin: 0
    };

    const contentStyle = {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        fontSize: '12px',
        color: '#4b5563'
    };

    return (
        <div style={nodeStyle}>
            {/* Unified Node Header */}
            <div style={headerStyle}>{label}</div>
            
            {/* Custom Internal Content Injection */}
            <div style={contentStyle}>
                {children}
            </div>

            {/* Dynamic Automated Handle Generation */}
            {handles.map((handle, index) => (
                <Handle
                    key={`${id}-${handle.id || index}`}
                    type={handle.type}
                    position={handle.position}
                    id={`${id}-${handle.id}`}
                    style={{
                        width: '8px',
                        height: '8px',
                        background: '#4f46e5', // modern indigo color
                        border: '2px solid #ffffff',
                        ...handle.style
                    }}
                />
            ))}
        </div>
    );
};