import jwt from "jsonwebtoken";
import User from "../models/User.js";

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
		console.log("🔐 Auth middleware - Token received:", token ? "✅ Yes" : "❌ No");
		if (!token) {
			return res.status(401).json({ message: "No token provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log("🔐 Token decoded successfully:", decoded.id);

		const dbUser = await User.findById(decoded.id).select("name email");
		if (!dbUser) {
			return res.status(401).json({ message: "User not found" });
		}

		req.user = {
			id: decoded.id,
			name: dbUser.name,
			email: dbUser.email,
		};

		console.log("✅ Auth passed for user:", dbUser.email);
		next();
	} catch (error) {
		console.error("🔐 Auth error:", error.message);
		return res.status(401).json({ message: "Invalid or expired token" });
	}
};

export default protect;
