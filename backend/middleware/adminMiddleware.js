export function checkSuperAdmin(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: Please login first' });
    }

    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Forbidden: Admin only' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export function checkAdmin(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: Please login first' });
    }
    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
      return res.status(403).json({ message: 'Forbidden: Admin only' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export function cinemaAccess(req, res, next) {
  try {
    if (req.user.role === 'superadmin') {
      return next();
    }
    
    if (Number(req.user.cinemaId) !== Number(req.params.cinemaId)) {
      return res.status(403).json({ message: 'Forbidden: Access to this cinema is denied' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
