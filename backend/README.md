# Portfolio Backend - Learning Section API

A Node.js + Express + MongoDB backend for managing learning posts in the Personal Portfolio.

## 📋 Features

✅ Full CRUD operations for learning posts
✅ MongoDB Atlas cloud database integration
✅ Category filtering and sorting
✅ Pin/unpin posts functionality
✅ Automatic timestamps (createdAt, updatedAt)
✅ Input validation
✅ CORS enabled for frontend integration
✅ Error handling

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup MongoDB Atlas
See [MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md) for detailed instructions.

### 3. Create .env file
```bash
cp .env.example .env
```

Update `.env` with your MongoDB Atlas credentials:
```
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/portfolio-learning?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5174
```

### 4. Start Server
```bash
npm run dev
```

You should see:
```
╔════════════════════════════════════════════════╗
║   Portfolio Learning Backend                  ║
║   Server running on: http://localhost:5000    ║
║   Environment: development                     ║
╚════════════════════════════════════════════════╝
```

## 📚 API Endpoints

### Get All Posts
```http
GET /api/learning
```

**Query Parameters:**
- `category` - Filter by category (Frontend, Backend, ML / AI, DSA, DevOps, Other)
- `sort` - Sort order (default: newest first, use `oldest` for oldest first)

**Example:**
```http
GET /api/learning?category=ML%20/%20AI&sort=newest
```

**Response:**
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Deep-diving into LSTM Gating Mechanisms",
      "content": "Today I spent 4 hours...",
      "category": "ML / AI",
      "tags": ["LSTM", "PyTorch", "Sequence Modeling"],
      "date": "2025-05-24T00:00:00Z",
      "pinned": true,
      "createdAt": "2025-05-24T10:30:00Z",
      "updatedAt": "2025-05-24T10:30:00Z"
    }
  ]
}
```

---

### Get Single Post
```http
GET /api/learning/:id
```

**Response:**
```json
{
  "success": true,
  "data": { /* post object */ }
}
```

---

### Create Post
```http
POST /api/learning
Content-Type: application/json

{
  "title": "Learning React Hooks",
  "content": "Today I explored how hooks work internally...",
  "category": "Frontend",
  "tags": ["React", "Hooks", "JavaScript"],
  "pinned": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": { /* new post object */ }
}
```

---

### Update Post
```http
PUT /api/learning/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "category": "Backend",
  "tags": ["Node.js", "Express"],
  "pinned": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Post updated successfully",
  "data": { /* updated post object */ }
}
```

---

### Delete Post
```http
DELETE /api/learning/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Post deleted successfully",
  "data": {}
}
```

---

### Toggle Pin Status
```http
PATCH /api/learning/:id/toggle-pin
```

**Response:**
```json
{
  "success": true,
  "message": "Post pinned successfully",
  "data": { /* updated post object with toggled pinned status */ }
}
```

---

## 🗂️ Project Structure

```
backend/
├── config/
│   └── database.js           # MongoDB connection setup
├── models/
│   └── LearningPost.js       # Mongoose schema and model
├── controllers/
│   └── learningController.js # Business logic for CRUD
├── routes/
│   └── learning.js           # API route definitions
├── server.js                 # Main server file
├── package.json              # Dependencies
├── .env                      # Environment variables (git-ignored)
├── .env.example              # Example environment variables
└── MONGODB_ATLAS_SETUP.md    # Setup instructions
```

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Enable cross-origin requests
- **dotenv** - Environment variable management
- **express-validator** - Input validation
- **nodemon** - Auto-reload during development

## 🔧 Available Scripts

```bash
# Start server in development with auto-reload
npm run dev

# Start server in production
npm start
```

## 🛡️ Security Tips

- ✅ Keep `.env` in `.gitignore`
- ✅ Never commit credentials
- ✅ Use environment variables for all secrets
- ✅ Validate all inputs
- ✅ Use HTTPS in production
- ✅ Whitelist frontend URL in CORS

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

## 🧪 Testing with Postman/curl

### Create a post
```bash
curl -X POST http://localhost:5000/api/learning \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learning MongoDB",
    "content": "MongoDB is a NoSQL database that stores data in JSON-like documents.",
    "category": "Backend",
    "tags": ["MongoDB", "Database"],
    "pinned": false
  }'
```

### Get all posts
```bash
curl http://localhost:5000/api/learning
```

### Get posts by category
```bash
curl "http://localhost:5000/api/learning?category=Frontend"
```

### Update a post
```bash
curl -X PUT http://localhost:5000/api/learning/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "pinned": true
  }'
```

### Delete a post
```bash
curl -X DELETE http://localhost:5000/api/learning/507f1f77bcf86cd799439011
```

## 📞 Support

For issues or questions:
1. Check [MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md)
2. Verify `.env` configuration
3. Check MongoDB Atlas Network Access settings
4. Review server logs for error messages

## 📄 License

MIT
