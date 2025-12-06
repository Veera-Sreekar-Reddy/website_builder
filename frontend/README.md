# Website Builder Frontend

React-based drag-and-drop website builder interface.

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Features

- Drag and drop components from palette
- Real-time property editing
- Visual component selection
- Code generation
- Save/Load from Strapi CMS
- Publish functionality

## Environment Variables

Create a `.env` file:

```
VITE_API_URL=http://localhost:1337/api
```

## Project Structure

```
src/
├── components/
│   ├── components/     # React components (Button, Text, etc.)
│   ├── ComponentPalette.jsx
│   ├── ComponentRenderer.jsx
│   ├── Editor.jsx
│   ├── PropertyPanel.jsx
│   └── Toolbar.jsx
├── utils/
│   ├── api.js         # Strapi API integration
│   └── codeGenerator.js  # React code generation
├── App.jsx            # Main application
└── main.jsx           # Entry point
```

## Building

```bash
npm run build
```

Output will be in the `dist` directory.

