import LearningPost from '../models/LearningPost.js'

// ════════════════════════════════════════════════════
// GET ALL LEARNING POSTS
// ════════════════════════════════════════════════════
export const getAllPosts = async (req, res) => {
  try {
    const { category, sort } = req.query
    let query = {}

    // Filter by category if provided
    if (category) {
      query.category = category
    }

    let posts = await LearningPost.find(query)

    // Sort by date (newest first) or custom sort
    if (sort === 'oldest') {
      posts = posts.sort((a, b) => new Date(a.date) - new Date(b.date))
    } else {
      posts = posts.sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    // Move pinned posts to top
    posts = posts.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ════════════════════════════════════════════════════
// GET SINGLE POST BY ID
// ════════════════════════════════════════════════════
export const getPostById = async (req, res) => {
  try {
    const post = await LearningPost.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      })
    }

    res.status(200).json({
      success: true,
      data: post
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ════════════════════════════════════════════════════
// CREATE NEW POST
// ════════════════════════════════════════════════════
export const createPost = async (req, res) => {
  try {
    const { title, content, category, tags, pinned } = req.body

    // Validation
    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, content, and category are required'
      })
    }

    const newPost = new LearningPost({
      title,
      content,
      category,
      tags: tags || [],
      pinned: pinned || false,
      date: new Date()
    })

    const savedPost = await newPost.save()

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: savedPost
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// ════════════════════════════════════════════════════
// UPDATE POST
// ════════════════════════════════════════════════════
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content, category, tags, pinned } = req.body

    let post = await LearningPost.findById(id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      })
    }

    // Update fields if provided
    if (title) post.title = title
    if (content) post.content = content
    if (category) post.category = category
    if (tags) post.tags = tags
    if (pinned !== undefined) post.pinned = pinned

    post.updatedAt = new Date()
    const updatedPost = await post.save()

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// ════════════════════════════════════════════════════
// DELETE POST
// ════════════════════════════════════════════════════
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params

    const post = await LearningPost.findByIdAndDelete(id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
      data: {}
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ════════════════════════════════════════════════════
// TOGGLE PIN STATUS
// ════════════════════════════════════════════════════
export const togglePin = async (req, res) => {
  try {
    const { id } = req.params

    let post = await LearningPost.findById(id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      })
    }

    post.pinned = !post.pinned
    post.updatedAt = new Date()
    const updatedPost = await post.save()

    res.status(200).json({
      success: true,
      message: `Post ${updatedPost.pinned ? 'pinned' : 'unpinned'} successfully`,
      data: updatedPost
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
