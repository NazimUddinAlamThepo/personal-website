import express from 'express'
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  togglePin
} from '../controllers/learningController.js'

const router = express.Router()

// GET all posts (with optional filters)
router.get('/', getAllPosts)

// GET single post by ID
router.get('/:id', getPostById)

// CREATE new post
router.post('/', createPost)

// UPDATE post
router.put('/:id', updatePost)

// DELETE post
router.delete('/:id', deletePost)

// TOGGLE pin status
router.patch('/:id/toggle-pin', togglePin)

export default router
