import Comment from '../models/comments';
import Product from '../models/products';

export async function createComment(req, res) {
  const {
    body: { comment, replyId, productId },
    currentUser,
  } = req;
  const commentObj = new Comment({
    product: productId,
    comment: replyId,
    message: comment,
    user: currentUser._id,
  });

  try {
    const product = await Product.findById(productId);
    await commentObj.save();
    product.comments.push(commentObj);
    await product.save();

    return res.status(201).json({
      success: true,
      comment: commentObj,
      message: `comment successfully created`,
    });
  } catch (error) {
    console.log('comment', error);
    return res.status(500).json(console.log(`Server error: ${error}`));
  }
}
