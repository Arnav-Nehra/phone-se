const jwt=require("jsonwebtoken")
const JWT_SECRET=require("./config").JWT_SECRET
const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(403).json({msg:"wrong token"})
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded=jwt.verify(token,JWT_SECRET)
      
           req.userid=decoded.userId 
           next()
    }
    catch(err){
        return res.status(403).json({message:"error occured"})
    }
}
module.exports={
    authMiddleware
}