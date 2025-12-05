//checkAuth.js
//middleware to check if user loged in

import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Token from '../models/accessToken.js';

export async function checkAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Please login first' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const storedToken = await Token.findOne({
      where: {
        token,
        revoked: 0
      }
    });

    const user = await User.findByPk(decoded.userId);

    if (!user || !storedToken) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
