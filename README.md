# Interactive JSON Tree Visualizer

An intuitive web application that allows users to visualize JSON data as a hierarchical, top-down tree structure. Built with React and React Flow, this tool features JSON path search, node highlighting, and a sleek, responsive design with light and dark themes.


---

## Features

-   **JSON Input & Validation**: A text area to paste or type JSON data with real-time validation and clear error messages.
-   **Hierarchical Tree Visualization**: Renders any valid JSON into a clean, top-down node tree using **React Flow**.
-   **Custom Styled Nodes**: Distinct colors and styles for Objects (`blue`), Arrays (`teal`), and Primitive values (`orange`) for easy identification.
-   **Powerful Path Search**: Search for any node using standard JSON path notation (e.g., `$.user.items[2].type`).
-   **Highlight & Pan**: Automatically highlights the matched node with a distinct color and pans the view to center it.
-   **Light & Dark Theme**: A seamless theme toggle that works without requiring any Tailwind configuration files.
-   **Responsive Design**: A clean, modern UI that works well on both desktop and mobile devices.
-   **Interactive Controls**: Includes standard zoom and pan controls provided by React Flow.

---

## Tech Stack

-   **Framework**: [React](https://reactjs.org/)
-   **Visualization**: [React Flow](https://reactflow.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Build Tool**: [Vite](https://vitejs.dev/) (or Create React App)

---

## Project Structure

The project is organized into a modular and maintainable structure to separate concerns.

```
/src
|-- /components
|   |-- /JSONTreeVisualizer
|   |   |-- CustomNode.jsx         # Defines the custom React Flow node component and styles.
|   |   |-- index.jsx              # The main component with UI, state, and event handling.
|   |   |-- layout.js              # Contains the top-down tree layout algorithm.
|   |   |-- ThemeStyles.jsx        # Injects CSS for dark mode without a config file.
|-- App.jsx                        # Main application component, wraps visualizer in ReactFlowProvider.
|-- index.css                      # Global styles and Tailwind CSS directives.
|-- main.jsx                       # Project entry point.
```

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18.x or higher recommended)
-   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/harsh-sharma-sde/json-tree-visualizer.git
    cd json-tree-visualizer
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```sh
    npm run dev
    # or
    yarn dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:5173` (or the port specified in your terminal) to see the application running.

---

## How It Works

This project includes two key pieces of custom logic to achieve the desired functionality and appearance.

### 1. Top-Down Layout Algorithm (`layout.js`)

React Flow does not come with a built-in tree layout engine. To achieve the top-down hierarchical look, the `generateLayout` function in `layout.js` implements a custom algorithm.

-   It performs a **post-order traversal** of the JSON tree (processing children before the parent).
-   Leaf nodes (primitives or empty objects/arrays) are positioned sequentially from left to right.
-   Each parent node's horizontal position (`x` coordinate) is then calculated as the **center point between its first and last child**.
-   The vertical position (`y` coordinate) is determined simply by the node's depth in the tree.

This ensures that every parent is perfectly centered above its direct descendants, creating the desired visual hierarchy.

### 2. Config-Free Theming (`ThemeStyles.jsx`)

A project requirement was to implement a theme toggle *without* modifying or creating a `tailwind.config.js` file.

-   The `ThemeStyles.jsx` component renders a literal `<style>` tag into the DOM.
-   This tag contains standard CSS rules that override the default light-theme styles when the `<html>` element has a `.dark` class (e.g., `.dark .themed-panel { ... }`).
-   The main component's `useEffect` hook is responsible for adding or removing the `.dark` class from `document.documentElement` when the theme state changes.
-   UI elements are given both Tailwind classes for the light theme and stable, semantic class names (e.g., `themed-panel`) for the dark theme CSS to target.

This approach effectively replicates Tailwind's `darkMode: 'class'` functionality in a self-contained way.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.