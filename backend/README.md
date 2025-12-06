# Website Builder Backend (Strapi)

This is the Strapi backend for the Website Builder application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Generate secure keys for your `.env` file. You can use:
```bash
openssl rand -base64 32
```

4. Start the development server:
```bash
npm run develop
```

5. Create an admin user when prompted.

6. Go to http://localhost:1337/admin and configure permissions:
   - Go to Settings > Users & Permissions Plugin > Roles > Public
   - Enable permissions for Website (find, findOne, create, update, delete)

## API Endpoints

- GET `/api/websites` - List all websites
- GET `/api/websites/:id` - Get a specific website
- POST `/api/websites` - Create a new website
- PUT `/api/websites/:id` - Update a website
- DELETE `/api/websites/:id` - Delete a website

