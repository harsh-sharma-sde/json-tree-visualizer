const NODE_WIDTH = 144; 
const HORIZONTAL_SPACING = 40;
const VERTICAL_SPACING = 80;

export const generateLayout = (json) => {
  const nodes = [];
  const edges = [];
  let idCounter = 0;
  let xOffset = 0; 

  function traverse(data, parentId = null, depth = 0, keyName = '$', path = '$') {
    const isObject = typeof data === 'object' && data !== null && !Array.isArray(data);
    const isArray = Array.isArray(data);
    const isPrimitive = !isObject && !isArray;

    const nodeId = `node-${idCounter++}`;
    const nodeType = isObject ? 'objectNode' : (isArray ? 'arrayNode' : 'primitiveKeyNode');
    
    const currentNode = {
      id: nodeId,
      position: { x: 0, y: depth * VERTICAL_SPACING },
      data: { label: String(keyName), path: path, type: 'object' },
      type: nodeType,
    };
    nodes.push(currentNode);

    if (parentId) {
      edges.push({ id: `e-${parentId}-${nodeId}`, source: parentId, target: nodeId, type: 'smoothstep', style: { strokeWidth: 2 }});
    }

    const childrenXPositions = [];

    if (isObject || isArray) {
      currentNode.data.type = isArray ? 'array' : 'object';
      const keys = Object.keys(data);
      if (keys.length === 0) {
        currentNode.position.x = xOffset;
        childrenXPositions.push(xOffset);
        xOffset += NODE_WIDTH + HORIZONTAL_SPACING;
      } else {
        keys.forEach(key => {
          const childPath = isArray ? `${path}[${key}]` : `${path}.${key}`;
          childrenXPositions.push(traverse(data[key], nodeId, depth + 1, key, childPath));
        });
      }
    } else {
      const valueNodeId = `node-${idCounter++}`;
      nodes.push({ id: valueNodeId, position: { x: xOffset, y: (depth + 1) * VERTICAL_SPACING }, data: { label: data === null ? 'null' : String(data), path: `${path}.value`, type: 'primitiveValue' }, type: 'primitiveValueNode' });
      edges.push({ id: `e-${nodeId}-${valueNodeId}`, source: nodeId, target: valueNodeId, type: 'smoothstep', style: { strokeWidth: 2 } });
      currentNode.data.type = 'primitiveKey';
      childrenXPositions.push(xOffset);
      xOffset += NODE_WIDTH + HORIZONTAL_SPACING;
    }
    
    const firstChildX = childrenXPositions[0];
    const lastChildX = childrenXPositions[childrenXPositions.length - 1];
    currentNode.position.x = (firstChildX + lastChildX) / 2;
    return currentNode.position.x;
  }

  traverse(json);
  return { nodes, edges };
};