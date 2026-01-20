import jwt from 'jsonwebtoken';
//To generate jwt token

const genToken=async(userId)=>{
    try {
        const token=await jwt.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn:"7d"});
        return token;
    } catch (error) {
        console.log("Error generating token: ",error)
    }
}
export default genToken;