// Authentication middleware
// Add JWT verification and other auth checks here

// Example middleware:
// module.exports = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token provided' });
//   // Verify token...
// };
