import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/database.js'
import learningRoutes from './routes/learning.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ════════════════════════════════════════════════════
// MIDDLEWARE
// ════════════════════════════════════════════════════
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ════════════════════════════════════════════════════
// DATABASE CONNECTION
// ════════════════════════════════════════════════════
connectDB()

// ════════════════════════════════════════════════════
// ROUTES
// ════════════════════════════════════════════════════
app.use('/api/learning', learningRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  })
})

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio Learning Backend API',
    version: '1.0.0',
    endpoints: {
      learning: '/api/learning',
      health: '/api/health'
    }
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  })
})

// ════════════════════════════════════════════════════
// ERROR HANDLING
// ════════════════════════════════════════════════════
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  })
})

// ════════════════════════════════════════════════════
// START SERVER
// ════════════════════════════════════════════════════
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║   Portfolio Learning Backend                  ║
║   Server running on: http://localhost:${PORT}    ║
║   Environment: ${process.env.NODE_ENV || 'development'}              ║
╚════════════════════════════════════════════════╝
  `)
})
