/**
 * Learning API Service
 * Handles all communication with the backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// ════════════════════════════════════════════════════
// FETCH ALL LEARNING POSTS
// ════════════════════════════════════════════════════
export const fetchAllLearningPosts = async (category = null, sort = 'newest') => {
  try {
    let url = `${API_BASE_URL}/learning`
    const params = new URLSearchParams()

    if (category) {
      params.append('category', category)
    }
    if (sort) {
      params.append('sort', sort)
    }

    if (params.toString()) {
      url += `?${params.toString()}`
    }

    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch posts')
    }

    return data.data
  } catch (error) {
    console.error('Error fetching learning posts:', error)
    throw error
  }
}

// ════════════════════════════════════════════════════
// FETCH SINGLE LEARNING POST
// ════════════════════════════════════════════════════
export const fetchLearningPost = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/learning/${id}`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch post')
    }

    return data.data
  } catch (error) {
    console.error('Error fetching learning post:', error)
    throw error
  }
}

// ════════════════════════════════════════════════════
// CREATE NEW LEARNING POST
// ════════════════════════════════════════════════════
export const createLearningPost = async (postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/learning`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create post')
    }

    return data.data
  } catch (error) {
    console.error('Error creating learning post:', error)
    throw error
  }
}

// ════════════════════════════════════════════════════
// UPDATE LEARNING POST
// ════════════════════════════════════════════════════
export const updateLearningPost = async (id, postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/learning/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update post')
    }

    return data.data
  } catch (error) {
    console.error('Error updating learning post:', error)
    throw error
  }
}

// ════════════════════════════════════════════════════
// DELETE LEARNING POST
// ════════════════════════════════════════════════════
export const deleteLearningPost = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/learning/${id}`, {
      method: 'DELETE'
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete post')
    }

    return data
  } catch (error) {
    console.error('Error deleting learning post:', error)
    throw error
  }
}

// ════════════════════════════════════════════════════
// TOGGLE POST PIN STATUS
// ════════════════════════════════════════════════════
export const togglePostPin = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/learning/${id}/toggle-pin`, {
      method: 'PATCH'
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to toggle pin')
    }

    return data.data
  } catch (error) {
    console.error('Error toggling pin status:', error)
    throw error
  }
}

// ════════════════════════════════════════════════════
// HEALTH CHECK
// ════════════════════════════════════════════════════
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/api/health`)
    return response.ok
  } catch (error) {
    console.warn('Backend health check failed:', error)
    return false
  }
}
