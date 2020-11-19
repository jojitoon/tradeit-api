"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CommentSchema = new _mongoose.default.Schema({
  message: {
    type: String,
    lowercase: true,
    trim: true,
    default: ''
  },
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  },
  product: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Comment'
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

var _default = _mongoose.default.model('Comment', CommentSchema);

exports.default = _default;