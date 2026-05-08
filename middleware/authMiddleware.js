import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ message: "No token provided" });
		}

		const token = authHeader.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = { id: decoded.id };
		if (typeof next === 'function') {
			return next();
		}

		console.error('authMiddleware: next is not a function', typeof next);
		return res.status(500).json({ message: 'Server middleware error' });
	} catch (error) {
		return res.status(401).json({ message: "Invalid or expired token" });
	}
};

export default authMiddleware;
