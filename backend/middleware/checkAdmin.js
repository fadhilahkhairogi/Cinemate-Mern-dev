export function checkAdmin(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: Please login first' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin only' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
