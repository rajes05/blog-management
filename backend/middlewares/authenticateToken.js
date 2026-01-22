import jwt from 'jsonwebtoken';

const authenticateToken = async(req, res, next)=>{
    try {
        const authHeader = req.header("authorization");
        const token = authHeader && authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"Unauthorized !"});
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decoded){
            return res.status(401).json({message:"Invalid or Expired token !"});
        }
        req.user=decoded; //attached decoded payload to req.user
        next(); //proceed to next middleware or route handler
    } catch (error) {
        return res.status(500).json({message:`Authenticate error: ${error}`});
    }
}
export default authenticateToken;