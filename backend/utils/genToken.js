import jwt from 'jsonwebtoken';
//To generate jwt token

//Payload : part of token that contain claims that include user ID, role or permissions

const genToken=async(userId)=>{
    try {
        const token=await jwt.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn:"7d"});
        return token;
    } catch (error) {
        console.log("Error generating token: ",error)
    }
}
export default genToken;