import jwt from "jsonwebtoken"

export const requireSignIn = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; 
        
        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: 'Please login first',
            });
        }

        const token = authHeader.split(" ")[1]; 

        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Token is missing in Authorization header',
            });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: 'Authorization failed',
            error,
        });
    }
};