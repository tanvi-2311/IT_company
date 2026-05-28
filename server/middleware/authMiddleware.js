import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'vedanco_super_secret_key_123';

export const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized! Invalid Token.' });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Require Admin Role!' });
  }
};

export const requirePermission = (action) => {
  return (req, res, next) => {
    // Admin always has all permissions
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    
    const perms = (req.user && req.user.permissions) ? req.user.permissions : [];
    
    // If checking for 'view', allow if they have ANY permission (they need to see the table to edit/delete)
    if (action === 'view' && perms.length > 0) {
      return next();
    }
    
    // Otherwise, check for the specific permission
    if (perms.includes(action)) {
      return next();
    }
    
    res.status(403).json({ message: `Access denied. Requires '${action}' permission.` });
  };
};
