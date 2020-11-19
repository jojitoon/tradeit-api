import mongoose from 'mongoose';
import pointSchema from './pointSchema';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    trim: true,
    lowerCase: true,
    default: '',
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: pointSchema,
    required: true,
    index: '2dsphere',
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model('User', UserSchema);
