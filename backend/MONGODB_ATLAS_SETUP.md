# MongoDB Atlas Setup Guide

## Step 1: Create a MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up" and create a free account
3. Verify your email

## Step 2: Create a Cluster
1. After signing in, click "Create" to build your first deployment
2. Choose **Free Tier** (M0 Sandbox)
3. Select your preferred cloud provider and region (closest to your location)
4. Name your cluster (e.g., "portfolio-learning")
5. Click "Create Deployment"

## Step 3: Create a Database User
1. Go to **Database Access** in the left sidebar
2. Click "+ Add New Database User"
3. Enter username and password (save these securely!)
4. Set permissions to "Atlas admin"
5. Click "Add User"

## Step 4: Whitelist IP Address
1. Go to **Network Access** in the left sidebar
2. Click "+ Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
   - ⚠️ In production, whitelist only your server's IP
4. Click "Confirm"

## Step 5: Get Connection String
1. Go to **Databases** in the left sidebar
2. Click "Connect" on your cluster
3. Select "Drivers"
4. Choose "Node.js" and version 5.5 or later
5. Copy the connection string

## Step 6: Update .env
Replace in `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/portfolio-learning?retryWrites=true&w=majority
```

Replace:
- `username` - your database user
- `password` - your database user password
- `cluster-name` - your cluster name (from connection string)

Example:
```
MONGODB_URI=mongodb+srv://nazimuddin:MySecurePass123@portfolio-cluster.mongodb.net/portfolio-learning?retryWrites=true&w=majority
```

## Step 7: Test Connection
Run the backend server:
```bash
cd backend
npm install
npm run dev
```

You should see:
```
✓ MongoDB Connected: cluster-name.mongodb.net
Server running on port 5000
```

## Security Notes
- ✅ Keep `.env` file in `.gitignore` (never commit it)
- ✅ Use strong passwords for database users
- ✅ In production, whitelist only your server's IP address
- ✅ Consider using environment variables in production hosting

## Troubleshooting

**Connection refused?**
- Check your IP is whitelisted in Network Access
- Verify username and password are correct
- Ensure internet connection is working

**"MongoServerError: connect ECONNREFUSED"?**
- Make sure you're using `mongodb+srv://` (not `mongodb://`)
- Check your connection string format

**"authentication failed"?**
- Verify username and password match your database user
- Make sure special characters are URL-encoded
