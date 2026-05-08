import jwt from "jsonwebtoken";

const getTokenFromRequest = (req) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		if (authHeader.startsWith("Bearer ")) {
			return authHeader.split(" ")[1];
		}

		return authHeader;
	}

	return (
		req.headers["x-auth-token"] ||
		req.headers["x-access-token"] ||
		req.body?.token ||
		req.body?.accessToken ||
		req.query?.token ||
		req.query?.accessToken ||
		null
	);
};

export const protect = async (req, res, next) => {
	try {
		const token = getTokenFromRequest(req);

		if (!token) {
			return res.status(401).json({ message: "No token provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = { id: decoded.id };
		return next();
	} catch (error) {
		return res.status(401).json({ message: "Invalid or expired token" });
	}
};

export default protect;
