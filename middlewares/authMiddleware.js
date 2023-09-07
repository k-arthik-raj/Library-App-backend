const jwt = require('jsonwebtoken');

const verifyAdminToken = (req, res, next) => {
  const token = req.header('Authorization'); 
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is invalid' });
    }

    if (!decoded.is_admin) {
      return res.status(403).json({ message: 'Access denied: User is not an admin' });
    }

    req.user = decoded;
    next();
  });
};


const verifyToken = (req, res, next) => {
  const token = req.header('Authorization'); 
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is invalid' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken, verifyAdminToken };
