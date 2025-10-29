import React from 'react';
import { Handle, Position } from 'reactflow';

const nodeBaseStyle = "rounded-md border-2 p-2 shadow-md w-36 text-center font-sans transition-colors duration-300";
const highlightClass = "ring-4 ring-offset-2 ring-yellow-400 dark:ring-offset-gray-900";

const NodeColorClasses = {
  object:         'bg-blue-200 border-blue-400 text-blue-900 json-node-object',
  array:          'bg-teal-200 border-teal-400 text-teal-900 json-node-array',
  primitiveKey:   'bg-teal-200 border-teal-400 text-teal-900 json-node-primitiveKey',
  primitiveValue: 'bg-orange-200 border-orange-400 text-orange-900 json-node-primitiveValue',
};

const CustomNodeComponent = ({ data }) => {
  const { label, isHighlighted, type } = data;
  const colorClass = NodeColorClasses[type] || NodeColorClasses.object;
  const appliedHighlight = isHighlighted ? highlightClass : '';

  return (
    <div className={`${nodeBaseStyle} ${colorClass} ${appliedHighlight}`} title={`Path: ${data.path}`}>
      <Handle type="target" position={Position.Top} className="!bg-transparent" />
      <div className="truncate font-semibold">{label}</div>
      <Handle type="source" position={Position.Bottom} className="!bg-transparent" />
    </div>
  );
};

export const nodeTypes = {
  objectNode: CustomNodeComponent,
  arrayNode: CustomNodeComponent,
  primitiveKeyNode: CustomNodeComponent,
  primitiveValueNode: CustomNodeComponent,
};