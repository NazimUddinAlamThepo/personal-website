import mongoose from 'mongoose'

const learningPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters']
    },
    content: {
      type: String,
      required: [true, 'Please add content'],
      minlength: [10, 'Content must be at least 10 characters']
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: ['Frontend', 'Backend', 'ML / AI', 'DSA', 'DevOps', 'Other'],
      default: 'Other'
    },
    tags: {
      type: [String],
      validate: {
        validator: (v) => v.length <= 5,
        message: 'Maximum 5 tags allowed'
      }
    },
    date: {
      type: Date,
      default: Date.now
    },
    pinned: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

// Update the updatedAt field before saving
learningPostSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

export default mongoose.model('LearningPost', learningPostSchema)
