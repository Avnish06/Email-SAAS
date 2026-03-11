import jwt from "jsonwebtoken";

/**
 * Access Controller Middleware
 * Verifies the JWT token and extracts the userId for use in subsequent controllers.
 */
export const accessController = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);

        if (!verifyToken) {
            return res.status(401).json({ message: "Invalid or expired token." });
        }

        req.userId = verifyToken.userId;
        next();
    } catch (error) {
        console.error("ACCESS CONTROLLER ERROR:", error.message);
        res.status(500).json({
            message: "An error occurred during authentication.",
            error: error.message
        });
    }
};
