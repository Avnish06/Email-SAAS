import jwt from "jsonwebtoken"
export const isAuth = async(req, res, next)=> {
try {
    let {token} = req.cookies
    if(!token)
    {
       return res.status(400).json({message:"User doesnot exist"})
    }
    
    let verifyToken = await jwt.verify(token, process.env.JWT_SECRET)
    
    if(!verifyToken)
     {
        return res.status(400).json({message:"Token verifcation unsuccessfull"})
     }
    req.userId = verifyToken.userId
    next()
} catch (error) {
    res.status(500).json({message:"Something Went Wrong while verifying your token"})
}
}



