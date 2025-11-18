 import jwt from 'jsonwebtoken';

const auth = (allowed = []) => async (req, res, next) => {
  try {
    // ✅ Step 1: Token header check
    const authHeader = req.header('Authorization');
    if (!authHeader)
      return res.status(401).json({ message: 'No token, auth denied' });

    // ✅ Step 2: Clean token (space ka issue fix)
    const token = authHeader.replace('Bearer ', '').trim(); 
    if (!token)
      return res.status(401).json({ message: 'No token, auth denied' });

    // ✅ Step 3: Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // ✅ Step 4: Role-based access
    if (allowed.length && !allowed.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied for your role' });
    }

    // ✅ Step 5: Continue if everything is fine
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token, auth denied' });
  }
};

export default auth;
