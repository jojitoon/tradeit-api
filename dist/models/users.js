"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _pointSchema = _interopRequireDefault(require("./pointSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSchema = new _mongoose.default.Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    trim: true,
    lowerCase: true,
    default: '',
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: _pointSchema.default,
    required: true,
    index: '2dsphere'
  },
  products: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  created_at: {
    type: Date,
    required: true,
    default: Date.now
  }
});

var _default = _mongoose.default.model('User', UserSchema);

exports.default = _default;