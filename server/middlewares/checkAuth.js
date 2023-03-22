import jwt from 'jsonwebtoken';
import { handleError } from '../error.js';

export const checkAuth = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next(handleError(401, 'You are not authenticated'));
  }

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return next(handleError(403, 'Invalid token'));
    }
    req.user = user;
    next();
  })
}