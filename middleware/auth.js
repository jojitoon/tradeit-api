import { log } from 'debug';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccount.json';
import User from '../models/users';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tradeit-app.firebaseio.com',
});

async function authMiddleware(req, res, next) {
  if (req.originalUrl.includes('users/create')) return next();

  const header = req.headers && req.headers.authorization;
  if (header && header !== 'Bearer null' && header.startsWith('Bearer ')) {
    const idToken = header.split('Bearer ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const user = await User.findOne({ email: decodedToken.email });
      if (user) {
        req.currentUser = user;
        return next();
      } else {
        return res.status(400).send({ error: 'You are unauthorized' });
      }
    } catch (err) {
      console.log('auth', err);
      return res.status(400).send({ error: 'You are unauthorized' });
    }
  }
  return res.status(400).send({ error: 'You are unauthorized' });
}
export default authMiddleware;
