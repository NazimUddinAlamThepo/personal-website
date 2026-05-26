# Personal Portfolio - Full Stack Application

A modern personal portfolio with a React frontend and Node.js + MongoDB backend for managing learning posts.

## 🏗️ Project Structure

This is a **monorepo** with separate frontend and backend applications:

```
Personal-Portfolio/
├── frontend/                 # React application (Vite + Tailwind + Framer Motion)
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API service (learningApi.js)
│   │   ├── data/            # Static data (portfolioData.js)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── styles/          # Global CSS
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Node.js + Express API
│   ├── config/              # Database configuration
│   ├── models/              # MongoDB schemas
│   ├── controllers/         # Business logic
│   ├── routes/              # API routes
│   ├── server.js
│   ├── package.json
│   └── .env                 # MongoDB Atlas credentials
└── README.md                # This file
```

## ✨ Features

### Frontend
- ✅ Modern React with Hooks
- ✅ Responsive Tailwind CSS
- ✅ Smooth animations with Framer Motion
- ✅ React Router for navigation
- ✅ Dark mode support
- ✅ Learning log, projects, skills, education sections

### Backend
- ✅ Express.js REST API
- ✅ MongoDB Atlas integration
- ✅ Full CRUD operations for learning posts
- ✅ Category filtering and sorting
- ✅ Pin/unpin posts
- ✅ Input validation
- ✅ CORS enabled
- ✅ Error handling

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- MongoDB Atlas account (free tier available)

### 1️⃣ Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Setup MongoDB Atlas (see backend/MONGODB_ATLAS_SETUP.md)
# Copy .env.example to .env and add your MongoDB URI
cp .env.example .env

# Edit .env with your MongoDB Atlas connection string
# MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/portfolio-learning

# Start backend server
npm run dev
```

You should see:
```
╔════════════════════════════════════════════════╗
║   Portfolio Learning Backend                  ║
║   Server running on: http://localhost:5000    ║
╚════════════════════════════════════════════════╝
```

### 2️⃣ Setup Frontend

```bash
# In a new terminal, from project root
npm install

# Start frontend development server
npm run dev
```

Frontend will run at `http://localhost:5174`

### 3️⃣ Access the Application

Open your browser and visit: `http://localhost:5174`

The frontend will automatically connect to the backend at `http://localhost:5000/api`

## 📚 Backend API Documentation

See [backend/README.md](./backend/README.md) for detailed API documentation and examples.

### Quick API Endpoints

```
GET    /api/learning              # Get all posts
GET    /api/learning/:id          # Get single post
POST   /api/learning              # Create post
PUT    /api/learning/:id          # Update post
DELETE /api/learning/:id          # Delete post
PATCH  /api/learning/:id/toggle-pin  # Toggle pin status
```

## 🔧 Available Commands

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
cd backend
npm run dev      # Start with auto-reload (nodemon)
npm start        # Start production server
```

## 🗄️ Database Setup

### MongoDB Atlas Setup (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a free M0 cluster
4. Create a database user
5. Whitelist your IP address
6. Get connection string
7. Add to `backend/.env`

See [backend/MONGODB_ATLAS_SETUP.md](./backend/MONGODB_ATLAS_SETUP.md) for detailed instructions.

## 🧪 Testing the Backend

### Using cURL

```bash
# Get all posts
curl http://localhost:5000/api/learning

# Create a post
curl -X POST http://localhost:5000/api/learning \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learning React",
    "content": "Explored React hooks today...",
    "category": "Frontend",
    "tags": ["React", "Hooks"]
  }'

# Update a post
curl -X PUT http://localhost:5000/api/learning/POSTID \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'

# Delete a post
curl -X DELETE http://localhost:5000/api/learning/POSTID
```

### Using Postman

1. Create a new collection
2. Import the endpoints from `/api/learning`
3. Set request method (GET, POST, PUT, DELETE, PATCH)
4. Add JSON body for POST/PUT requests
5. Send requests

## 📁 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/portfolio-learning
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5174
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

## 📝 Learning Post Schema

```javascript
{
  title: String (required, max 200 chars),
  content: String (required, min 10 chars),
  category: String (enum: 'Frontend', 'Backend', 'ML / AI', 'DSA', 'DevOps', 'Other'),
  tags: Array of Strings (max 5 tags),
  date: Date (defaults to now),
  pinned: Boolean (defaults to false),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🔐 Security Considerations

- ✅ Keep `.env` files in `.gitignore`
- ✅ Never commit credentials to repository
- ✅ Use HTTPS in production
- ✅ Validate all inputs on backend
- ✅ Implement rate limiting in production
- ✅ Use environment variables for secrets

## 📦 Deployment

### Frontend (Vercel/Netlify)
1. Push to GitHub
2. Connect repository to Vercel/Netlify
3. Set `VITE_API_URL` to production backend URL
4. Deploy

### Backend (Render/Railway/Heroku)
1. Push to GitHub
2. Connect repository to hosting service
3. Set environment variables (MONGODB_URI, etc.)
4. Deploy

## 🐛 Troubleshooting

### Backend won't connect to MongoDB
- Check MongoDB Atlas IP whitelist
- Verify connection string in `.env`
- Ensure database user exists
- Check internet connection

### Frontend can't reach backend
- Verify backend is running on port 5000
- Check `VITE_API_URL` in `.env`
- Check CORS settings in `backend/server.js`
- Look for errors in browser console

### Ports already in use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5174 (frontend)
lsof -ti:5174 | xargs kill -9
```

## 📞 Support

Refer to:
- [Backend README](./backend/README.md) - API documentation
- [MongoDB Setup Guide](./backend/MONGODB_ATLAS_SETUP.md) - Database setup
- [Frontend docs](https://react.dev) - React documentation

## 📄 License

MIT

## 👤 Author

Md. Nazimuddin Alam Thepo

## 🙏 Acknowledgments

- React & Vite communities
- MongoDB Atlas
- Tailwind CSS
- Framer Motion
