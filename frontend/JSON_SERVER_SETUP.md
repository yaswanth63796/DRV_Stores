# DRV Stores - JSON Server Setup

## Configuration Complete ✅

Your project has been configured to use `db.json` as a dummy backend with json-server.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start JSON Server (Terminal 1)
```bash
npm run server
```
This will start json-server on `http://localhost:3000`

### 3. Start React App (Terminal 2)
```bash
npm run dev
```
This will start the Vite dev server (usually on `http://localhost:5173`)

## Test Credentials

### Customer Account
- Email: `customer@test.com`
- Password: `password123`
- Role: customer

### Shopkeeper Account
- Email: `shopkeeper@test.com`
- Password: `password123`
- Role: shopkeeper

**Note**: Password is hardcoded as 'password123' for all users in demo mode.

## What Changed

1. ✅ Created `db.json` with dummy data (users, products, orders, bills)
2. ✅ Added json-server to package.json
3. ✅ Updated API base URL from `http://localhost:5000/api` to `http://localhost:3000`
4. ✅ Modified all service files to work with json-server REST API
5. ✅ Updated AuthContext to handle authentication with dummy data

## API Endpoints

- **Users**: `http://localhost:3000/users`
- **Products**: `http://localhost:3000/products`
- **Orders**: `http://localhost:3000/orders`
- **Bills**: `http://localhost:3000/bills`

## Notes

- json-server provides a full REST API with GET, POST, PUT, DELETE
- Data persists in `db.json` file
- Authentication is simplified (no real JWT validation)
- Low-stock filtering happens client-side
