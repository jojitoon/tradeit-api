import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  message: {
    type: String,
    lowercase: true,
    trim: true,
    default: '',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model('Comment', CommentSchema);
