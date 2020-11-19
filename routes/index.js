import { Router } from 'express';
import { createComment } from '../controllers/comment';
import {
  createProduct,
  getAllProducts,
  getOneProduct,
} from '../controllers/product';
import { createUser } from '../controllers/user';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, (req, res) => {
  res.send({ message: 'welcome', user: req.currentUser });
});

router.post('/users/create', createUser);
router.post('/users/comment', authMiddleware, createComment);
router.post('/products/create', authMiddleware, createProduct);
router.get('/products/', authMiddleware, getAllProducts);
router.get('/products/:id', authMiddleware, getOneProduct);
export default router;
