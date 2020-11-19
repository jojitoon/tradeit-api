"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _pointSchema = _interopRequireDefault(require("./pointSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ProductSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    default: ''
  },
  image: {
    required: true,
    type: String
  },
  radius: {
    type: Number
  },
  location: {
    type: _pointSchema.default,
    required: true,
    index: '2dsphere'
  },
  userId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

var _default = _mongoose.default.model('Product', ProductSchema);

exports.default = _default;