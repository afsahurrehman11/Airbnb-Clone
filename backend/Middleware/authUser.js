import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
        // Extract Authorization header
        const authHeader = req.headers.authorization;

        // Check if the Authorization header exists and starts with "Bearer"
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
        }

        // Extract the token from the header
        const token = authHeader.split(" ")[1];

        // Verify the token using the secret key
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_GUEST);

        // Attach user information to the request object
        req.user = { userId: token_decode.id };

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default authUser;
