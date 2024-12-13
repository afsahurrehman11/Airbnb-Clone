import jwt from "jsonwebtoken"

// admin authentication middleware


const authHost = async (req, res, next) => {
    try {

        const { htoken } = req.headers
        if (!htoken) {
            return res.status(401).json({ success: false, message: "Not Authorized Login Again" })
        }
        const token_decode = jwt.verify(htoken, process.env.JWT_SECRET_HOST)

        req.user = { userId: token_decode.id };

        next()

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}



export default authHost