"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = require("debug");

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

var _serviceAccount = _interopRequireDefault(require("./serviceAccount.json"));

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_firebaseAdmin.default.initializeApp({
  credential: _firebaseAdmin.default.credential.cert(_serviceAccount.default),
  databaseURL: 'https://tradeit-app.firebaseio.com'
});

async function authMiddleware(req, res, next) {
  if (req.originalUrl.includes('users/create')) return next();
  const header = req.headers && req.headers.authorization;

  if (header && header !== 'Bearer null' && header.startsWith('Bearer ')) {
    const idToken = header.split('Bearer ')[1];

    try {
      const decodedToken = await _firebaseAdmin.default.auth().verifyIdToken(idToken);
      const user = await _users.default.findOne({
        email: decodedToken.email
      });

      if (user) {
        req.currentUser = user;
        return next();
      } else {
        return res.status(400).send({
          error: 'You are unauthorized'
        });
      }
    } catch (err) {
      console.log('auth', err);
      return res.status(400).send({
        error: 'You are unauthorized'
      });
    }
  }

  return res.status(400).send({
    error: 'You are unauthorized'
  });
}

var _default = authMiddleware;
exports.default = _default;