# S2 Cell Visualizer

A high-performance, interactive visualization tool for Google's S2 Geometry library. Built with React, Leaflet, and s2js.

![S2 Cell Visualizer Screenshot](/home/sameer/.gemini/antigravity/brain/11bff218-fae5-43f2-a480-0ace58769007/after_mouse_move_1764270071777.png)

## Features

-   **Real-time S2 Cell Rendering**: Visualize S2 cells dynamically as you move across the map.
-   **Level Control**: Adjust S2 levels from 0 (global) to 30 (centimeter precision) using an intuitive slider.
-   **Cell Inspection**: View detailed cell information including Token, ID (BigInt), and Level.
-   **Dark Mode UI**: Sleek, glassmorphism-inspired interface for a premium user experience.

## Tech Stack

-   **Frontend**: React, TypeScript, Vite
-   **Map**: Leaflet, React-Leaflet
-   **Styling**: TailwindCSS
-   **Geometry**: s2js

## Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd s2-cell-visualizer
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Usage

-   **Pan/Zoom**: Navigate the map like any standard web map.
-   **Hover**: Move your mouse to see the S2 cell covering that point at the selected level.
-   **Adjust Level**: Use the slider in the top-left panel to change the S2 cell level. Lower levels cover larger areas; higher levels are more precise.

---

Built with ❤️ using [s2js](https://github.com/s2geometry/s2js) and [Leaflet](https://leafletjs.com/).
