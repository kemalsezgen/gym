import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json('no token found');
  }

  jwt.verify(token, process.env.SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json('Invalid token');
    }
    req.user = {
      id: payload.id
    }
    next();
  })
}