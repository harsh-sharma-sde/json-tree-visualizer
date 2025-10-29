import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, Controls, Background, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';

import { nodeTypes } from './CustomNode';
import { generateLayout } from './layout';
import ThemeStyles from './ThemeStyles';

const JSONTreeVisualizerContent = () => {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify({ user: { id: 1, name: { first: "John", last: "Doe" }, city: "New York", items: ["mouse", "keyboard", { type: "monitor", size: 27 }], active: true }, status: "ok" }, null, 2)
  );
  const [jsonError, setJsonError] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [searchQuery, setSearchQuery] = useState('$.user.items[2].type');
  const [searchMessage, setSearchMessage] = useState('');
  const [theme, setTheme] = useState('light');
  const { fitView, setCenter } = useReactFlow();

  const visualizeJson = useCallback(() => {
    setJsonError('');
    setSearchMessage('');
    try {
      const data = JSON.parse(jsonInput);
      const { nodes: newNodes, edges: newEdges } = generateLayout(data);
      setNodes(newNodes);
      setEdges(newEdges);
      setTimeout(() => fitView({ padding: 0.1, duration: 500 }), 100);
    } catch (e) {
      setJsonError(`Invalid JSON: ${e.message}`);
      setNodes([]);
      setEdges([]);
    }
  }, [jsonInput, setNodes, setEdges, fitView]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => { visualizeJson(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    setNodes(ns => ns.map(n => ({ ...n, data: { ...n.data, isHighlighted: false } })));
    const targetNode = nodes.find(n => n.data.path === searchQuery);
    if (targetNode) {
      setSearchMessage(`Match found: ${searchQuery}`);
      setNodes(ns => ns.map(n => (n.id === targetNode.id ? { ...n, data: { ...n.data, isHighlighted: true } } : n)));
      setCenter(targetNode.position.x + 72, targetNode.position.y, { zoom: 1.2, duration: 600 });
    } else {
      setSearchMessage(`No match found for path: ${searchQuery}`);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-white themed-bg text-gray-900 themed-text transition-colors">
      <ThemeStyles />
      <div className="max-w-screen-xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold">JSON Tree Visualizer</h1>
          <p className="text-lg text-gray-600 themed-text-muted">Visualize JSON data as an interactive top-down tree.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          <div className="md:col-span-4 lg:col-span-3">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 themed-panel">
              <h2 className="text-lg font-semibold mb-2">JSON Input</h2>
              <textarea className="w-full h-48 p-2 border rounded-md text-sm font-mono bg-white border-gray-300 themed-input focus:ring-2 focus:ring-blue-500" value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} placeholder="Paste your JSON here..." />
              {jsonError && <p className="text-red-500 text-xs mt-1">{jsonError}</p>}
              <button onClick={visualizeJson} className="mt-2 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">Generate Tree</button>
              <hr className="my-4 border-gray-200 themed-hr" />
              <h2 className="text-lg font-semibold mb-2">Search Path</h2>
              <form onSubmit={handleSearch}>
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="e.g., $.user.items[0]" className="w-full p-2 border rounded-md text-sm bg-white border-gray-300 themed-input focus:ring-2 focus:ring-teal-500" />
                {searchMessage && <p className={`text-xs mt-1 ${searchMessage.startsWith('No match') ? 'text-red-400' : 'text-green-400'}`}>{searchMessage}</p>}
                <button type="submit" className="mt-2 w-full px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition">Search & Highlight</button>
              </form>
              <hr className="my-4 border-gray-200 themed-hr" />
              <div className="flex justify-between items-center">
                <span className="font-medium">Theme</span>
                <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-200 hover:bg-gray-300 themed-panel">{theme === 'light' ? '🌙 Dark' : '☀️ Light'}</button>
              </div>
            </div>
          </div>
          <div className="md:col-span-8 lg:col-span-9 h-[85vh]">
            <div className="w-full h-full border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden themed-flow-bg">
              <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} nodeTypes={nodeTypes} fitView>
                <Controls showInteractive={false} />
                <Background variant="dots" gap={24} size={1} />
              </ReactFlow>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONTreeVisualizerContent;