import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
    try {
        let accessToken = req.body["access_token"];
        if (accessToken) {
            jwt.verify(
                accessToken,
                "123456789",
                (err, decoded) => {
                    if (err) {
                        return res.status(401).json({
                            message: err.message,
                            status: 401,
                        })
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                }
            )
        } else {
            return res.status(401).json({
                message: 'No token provided',
                status: 401
            })
        }
    } catch (err) {
        return res.status(401).json({
            message: err.message,
            status: 401
        })
    }
}