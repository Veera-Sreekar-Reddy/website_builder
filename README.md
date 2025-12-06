# Website Builder

A visual drag-and-drop website builder that generates production-ready React code, stores configurations in Strapi CMS, and publishes websites to custom domains.

## Features

- 🎨 **Drag & Drop Interface** - Intuitive visual editor with component palette
- ⚛️ **React Components** - Pre-built components (Button, Text, Image, Container, Heading, Input)
- ✏️ **Property Editor** - Edit component properties in real-time
- 💾 **Code Generation** - Automatically generates React code from your layout
- 🗄️ **Strapi CMS** - Headless CMS integration for storing website configurations
- 🚀 **Publishing** - Publish websites directly to custom domains

## Project Structure

```
website_builder/
├── frontend/          # React drag-and-drop editor
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── utils/         # Code generator & API utilities
│   │   └── App.jsx        # Main application
│   └── package.json
├── backend/           # Strapi CMS backend
│   ├── src/api/      # API endpoints
│   ├── config/       # Strapi configuration
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js 18+ and npm
- Basic knowledge of React and Strapi

## Setup Instructions

### 1. Backend Setup (Strapi)

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys-here
ADMIN_JWT_SECRET=your-admin-jwt-secret-here
API_TOKEN_SALT=your-api-token-salt-here
TRANSFER_TOKEN_SALT=your-transfer-token-salt-here
```

Generate secure keys:
```bash
# Generate random keys (run 4 times for different keys)
openssl rand -base64 32
```

Start Strapi:
```bash
npm run develop
```

When Strapi starts:
1. Create an admin user account
2. Go to Settings > Users & Permissions Plugin > Roles > Public
3. Enable all permissions for "Website" (find, findOne, create, update, delete)

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:1337/api
```

Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Usage

1. **Drag Components**: Drag components from the left palette to the canvas
2. **Select & Edit**: Click on a component to select it and edit properties in the right panel
3. **Save**: Click "Save" to store your website configuration in Strapi
4. **Publish**: Click "Publish" to generate code and assign a domain

## Component Types

- **Container**: Wrapper component with customizable padding and background
- **Heading**: Text headings (H1-H4) with customizable size
- **Text**: Paragraph text with font size and color options
- **Button**: Interactive buttons with variants (primary, secondary, danger) and sizes
- **Image**: Image component with URL and alt text
- **Input**: Form input fields with different types (text, email, password, number)

## API Integration

The frontend communicates with Strapi through REST API:

- `GET /api/websites` - List all websites
- `GET /api/websites/:id` - Get specific website
- `POST /api/websites` - Create new website
- `PUT /api/websites/:id` - Update website
- `DELETE /api/websites/:id` - Delete website

## Publishing & Domain Connection

When you click "Publish":
1. The system generates React code from your layout
2. Stores the configuration in Strapi with `published: true`
3. Assigns a domain (currently simulated as `site-{id}.example.com`)

### Real Domain Integration

To connect to actual domains, you'll need to:

1. **Set up a deployment service** (e.g., Vercel, Netlify, AWS)
2. **Create a deployment webhook** that:
   - Receives published website data
   - Builds and deploys the React code
   - Configures DNS for the custom domain
3. **Update the publish function** in `frontend/src/utils/api.js` to call your deployment service

Example integration with Vercel:

```javascript
// In publishWebsite function
const vercelResponse = await axios.post('https://api.vercel.com/v13/deployments', {
  name: websiteName,
  files: [
    {
      file: 'package.json',
      data: generatePackageJson(code)
    },
    {
      file: 'src/App.jsx',
      data: code
    }
  ],
  projectSettings: {
    framework: 'vite'
  }
}, {
  headers: {
    'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`
  }
})
```

## Code Generation

The code generator (`frontend/src/utils/codeGenerator.js`) converts your visual layout into React code:

- Imports necessary components
- Generates JSX with proper props
- Creates a complete React component file

Generated code example:
```jsx
import React from 'react'
import Button from './components/Button'
import Text from './components/Text'

function GeneratedWebsite() {
  return (
    <div className="website-container">
      <Button text="Click Me" variant="primary" size="medium" />
      <Text content="Hello World" fontSize={16} color="#000000" />
    </div>
  )
}

export default GeneratedWebsite
```

## Development

### Frontend Development
```bash
cd frontend
npm run dev
```

### Backend Development
```bash
cd backend
npm run develop
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

Backend:
```bash
cd backend
npm run build
npm run start
```

## Customization

### Adding New Components

1. Create component in `frontend/src/components/components/`
2. Add to `COMPONENT_MAP` in `ComponentRenderer.jsx`
3. Add to `COMPONENT_TYPES` in `ComponentPalette.jsx`
4. Add default props in `App.jsx` `getDefaultProps`
5. Add property inputs in `PropertyPanel.jsx`

### Styling

All components have their own CSS files. Modify styles in:
- `frontend/src/components/components/*.css`
- `frontend/src/components/*.css`

## Troubleshooting

### CORS Errors
Make sure Strapi CORS is configured in `backend/config/middlewares.js` to allow your frontend origin.

### API Connection Issues
- Verify Strapi is running on port 1337
- Check `.env` file has correct `VITE_API_URL`
- Ensure Strapi permissions are set correctly

### Component Not Rendering
- Check browser console for errors
- Verify component is in `COMPONENT_MAP`
- Ensure component props match expected format

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
