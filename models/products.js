import mongoose from 'mongoose';
import pointSchema from './pointSchema';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    default: '',
  },
  image: {
    required: true,
    type: String,
  },
  radius: {
    type: Number,
  },
  location: {
    type: pointSchema,
    required: true,
    index: '2dsphere',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model('Product', ProductSchema);
