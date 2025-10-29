import React from 'react';

const ThemeStyles = () => (
  <style>{`
    /* Base UI in Dark Mode */
    .dark .themed-bg { background-color: #030712; } /* gray-950 */
    .dark .themed-text { color: #f9fafb; } /* gray-100 */
    .dark .themed-text-muted { color: #9ca3af; } /* gray-400 */
    .dark .themed-panel { background-color: #111827; border-color: #374151; } /* bg-gray-900, border-gray-700 */
    .dark .themed-input { background-color: #1f2937; border-color: #4b5563; color: #f9fafb; } /* bg-gray-800, border-gray-600 */
    .dark .themed-hr { border-color: #374151; } /* border-gray-700 */
    .dark .themed-flow-bg { border-color: #374151; } /* border-gray-700 */

    /* Custom Nodes in Dark Mode */
    .dark .json-node-object { background-color: rgba(37, 99, 235, 0.4); border-color: #3b82f6; color: #dbeafe; } /* blue */
    .dark .json-node-array { background-color: rgba(13, 148, 136, 0.4); border-color: #0d9488; color: #ccfbf1; } /* teal */
    .dark .json-node-primitiveKey { background-color: rgba(13, 148, 136, 0.4); border-color: #0d9488; color: #ccfbf1; } /* teal */
    .dark .json-node-primitiveValue { background-color: rgba(217, 119, 6, 0.4); border-color: #f97316; color: #ffedd5; } /* orange */
  `}</style>
);

export default ThemeStyles;