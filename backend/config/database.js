import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // MongoDB Atlas Stable API settings
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
      // Connection pooling
      maxPoolSize: 10,
      minPoolSize: 5,
      // Timeouts
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
    })

    // Send a ping to confirm connection
    await mongoose.connection.db.admin().command({ ping: 1 })
    
    console.log(`
╔═══════════════════════════════════════════════════╗
║  ✓ MongoDB Atlas Connected Successfully!         ║
║  Host: cluster0.buwsczr.mongodb.net              ║
║  Database: portfolio-learning                    ║
╚═══════════════════════════════════════════════════╝
    `)
    
    return conn
  } catch (error) {
    console.error(`
╔═══════════════════════════════════════════════════╗
║  ✗ MongoDB Connection Error                      ║
║  ${error.message}
╚═══════════════════════════════════════════════════╝
    `)
    process.exit(1)
  }
}

