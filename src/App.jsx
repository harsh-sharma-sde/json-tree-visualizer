import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import JSONTreeVisualizer from './components/JSONTreeVisualizer';

function App() {
  return (
    <ReactFlowProvider>
      <JSONTreeVisualizer />
    </ReactFlowProvider>
  );
}

export default App;