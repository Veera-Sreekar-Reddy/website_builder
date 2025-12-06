# Quick Setup Guide

Follow these steps to get your Website Builder up and running:

## Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

## Step 2: Configure Strapi

1. Create `.env` file in `backend/` directory:
```bash
cd backend
cp .env.example .env
```

2. Generate secure keys (run these commands and copy the output):
```bash
openssl rand -base64 32  # For APP_KEYS
openssl rand -base64 32  # For ADMIN_JWT_SECRET
openssl rand -base64 32  # For API_TOKEN_SALT
openssl rand -base64 32  # For TRANSFER_TOKEN_SALT
```

3. Update `.env` file with the generated keys:
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=<paste-first-key-here>
ADMIN_JWT_SECRET=<paste-second-key-here>
API_TOKEN_SALT=<paste-third-key-here>
TRANSFER_TOKEN_SALT=<paste-fourth-key-here>
```

## Step 3: Start Strapi

```bash
cd backend
npm run develop
```

When Strapi starts:
1. Open http://localhost:1337/admin
2. Create your admin account
3. Go to **Settings** > **Users & Permissions Plugin** > **Roles** > **Public**
4. Under **Website** permissions, enable:
   - `find`
   - `findOne`
   - `create`
   - `update`
   - `delete`

## Step 4: Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

## Step 5: Configure Frontend

Create `.env` file in `frontend/` directory:

```bash
cd frontend
echo "VITE_API_URL=http://localhost:1337/api" > .env
```

## Step 6: Start Frontend

```bash
cd frontend
npm run dev
```

## Step 7: Start Building!

1. Open http://localhost:3000 in your browser
2. Drag components from the left palette to the canvas
3. Click components to select and edit their properties
4. Click "Save" to store your website
5. Click "Publish" to generate code and assign a domain

## Troubleshooting

### Port Already in Use
If port 1337 or 3000 is already in use:
- Strapi: Change `PORT` in `backend/.env`
- Frontend: Change port in `frontend/vite.config.js`

### CORS Errors
Make sure Strapi CORS is configured in `backend/config/middlewares.js` to include `http://localhost:3000`

### API Connection Failed
- Verify Strapi is running on the correct port
- Check `.env` file has correct `VITE_API_URL`
- Ensure Strapi permissions are set correctly

## Next Steps

- Customize components in `frontend/src/components/components/`
- Add new component types (see README.md)
- Integrate with real deployment service (see `deployment-service.js`)

