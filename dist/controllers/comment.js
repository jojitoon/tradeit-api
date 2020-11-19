"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createComment = createComment;

var _comments = _interopRequireDefault(require("../models/comments"));

var _products = _interopRequireDefault(require("../models/products"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function createComment(req, res) {
  const {
    body: {
      comment,
      replyId,
      productId
    },
    currentUser
  } = req;
  const commentObj = new _comments.default({
    product: productId,
    comment: replyId,
    message: comment,
    user: currentUser._id
  });

  try {
    const product = await _products.default.findById(productId);
    await commentObj.save();
    product.comments.push(commentObj);
    await product.save();
    return res.status(201).json({
      success: true,
      comment: commentObj,
      message: `comment successfully created`
    });
  } catch (error) {
    console.log('comment', error);
    return res.status(500).json(console.log(`Server error: ${error}`));
  }
}