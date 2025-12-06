# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Palette    │  │    Editor    │  │  Properties  │     │
│  │  (Drag)      │  │  (Drop/Edit) │  │   (Edit)     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Code Generator                              │   │
│  │  (Converts layout → React code)                     │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Backend (Strapi CMS)                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Website Content Type                              │   │
│  │  - name: string                                    │   │
│  │  - components: JSON                                │   │
│  │  - generatedCode: text                             │   │
│  │  - domain: string                                  │   │
│  │  - published: boolean                              │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ (On Publish)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│         Deployment Service (Optional)                        │
│  - Receives published website data                          │
│  - Builds React application                                 │
│  - Deploys to hosting (Vercel/Netlify/AWS)                   │
│  - Configures DNS for custom domain                         │
└─────────────────────────────────────────────────────────────┘
```

## Component Flow

### 1. Drag & Drop Flow

```
User drags component from Palette
    ↓
ComponentPalette (useDrag hook)
    ↓
Drops on Editor canvas
    ↓
Editor (useDrop hook) → calls onAddComponent
    ↓
App.jsx → creates component object
    ↓
Component added to components array
    ↓
ComponentRenderer renders component
```

### 2. Edit Flow

```
User clicks component
    ↓
ComponentRenderer → onSelect(component)
    ↓
App.jsx → setSelectedComponent
    ↓
PropertyPanel receives component
    ↓
User edits property
    ↓
PropertyPanel → onUpdate(id, updates)
    ↓
App.jsx → updates component in array
    ↓
Component re-renders with new props
```

### 3. Save Flow

```
User clicks "Save"
    ↓
App.jsx → generateCode(components)
    ↓
Code Generator creates React code string
    ↓
API call → saveWebsite(id, data)
    ↓
Strapi stores website configuration
    ↓
Returns website ID
```

### 4. Publish Flow

```
User clicks "Publish"
    ↓
App.jsx → generateCode(components)
    ↓
API call → publishWebsite(id, data)
    ↓
Strapi:
  - Stores website with published: true
  - Generates/assigns domain
  - Returns website with domain
    ↓
(Optional) Deployment Service:
  - Receives webhook
  - Builds React app
  - Deploys to hosting
  - Configures DNS
```

## Data Structures

### Component Object

```javascript
{
  id: "comp-1234567890-abc123",
  type: "Button",  // Component type
  props: {         // Component properties
    text: "Click Me",
    variant: "primary",
    size: "medium"
  },
  children: []      // Nested components (optional)
}
```

### Website Object (Strapi)

```javascript
{
  id: 1,
  name: "My Website",
  components: [...],           // Array of component objects
  generatedCode: "...",       // Generated React code string
  domain: "site-1.example.com",
  published: true,
  publishedAt: "2024-01-01T00:00:00.000Z"
}
```

## Key Technologies

### Frontend
- **React 18** - UI framework
- **react-dnd** - Drag and drop functionality
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API calls

### Backend
- **Strapi 4** - Headless CMS
- **SQLite** - Database (default, can be changed to PostgreSQL/MySQL)
- **REST API** - Standard Strapi REST endpoints

## File Organization

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── components/        # React components (Button, Text, etc.)
│   │   ├── ComponentPalette.jsx
│   │   ├── ComponentRenderer.jsx
│   │   ├── Editor.jsx
│   │   ├── PropertyPanel.jsx
│   │   └── Toolbar.jsx
│   ├── utils/
│   │   ├── api.js            # Strapi API integration
│   │   └── codeGenerator.js  # React code generation
│   ├── App.jsx               # Main application
│   └── main.jsx              # Entry point
└── package.json
```

### Backend Structure
```
backend/
├── src/
│   ├── api/
│   │   └── website/
│   │       ├── content-types/
│   │       │   └── website/
│   │       │       └── schema.json
│   │       ├── controllers/
│   │       │   └── website.js
│   │       └── routes/
│   │           └── website.js
│   └── index.js
├── config/
│   ├── database.js
│   ├── server.js
│   ├── middlewares.js
│   └── admin.js
└── package.json
```

## Extensibility

### Adding New Components

1. Create component file: `frontend/src/components/components/NewComponent.jsx`
2. Add to `COMPONENT_MAP` in `ComponentRenderer.jsx`
3. Add to `COMPONENT_TYPES` in `ComponentPalette.jsx`
4. Add default props in `App.jsx` → `getDefaultProps()`
5. Add property inputs in `PropertyPanel.jsx`

### Custom Deployment

The `deployment-service.js` file provides a reference implementation. To integrate:

1. Create a webhook endpoint in Strapi
2. Configure webhook to call deployment service on publish
3. Implement deployment logic for your hosting provider
4. Handle DNS configuration

## Security Considerations

- **CORS**: Configured in Strapi middlewares
- **API Permissions**: Set via Strapi Roles & Permissions
- **Environment Variables**: Store sensitive keys in `.env` files
- **Input Validation**: Add validation in Strapi controllers
- **XSS Protection**: React automatically escapes content

## Performance

- **Code Splitting**: Can be added via Vite
- **Component Lazy Loading**: Can lazy load component library
- **API Caching**: Strapi supports caching
- **Database Indexing**: Add indexes for frequently queried fields

## Future Enhancements

- [ ] Nested component support (drag into containers)
- [ ] Undo/Redo functionality
- [ ] Component templates/presets
- [ ] Real-time collaboration
- [ ] Version history
- [ ] Preview mode
- [ ] Export to static HTML
- [ ] Component marketplace
- [ ] Custom CSS editor
- [ ] Responsive breakpoints

