import jwt from 'jsonwebtoken';
const auth =(allowed=[])=>async (req,res,next) => {
    try {
        const authHeader=req.header('Authorization');
        if(!authHeader) return res.status(401).json({message:'No token, auth denied'})
            const token=authHeader.replace('Bearer', '');
        if(!token) return res.status(401).json({message:'No token, auht denied'});
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        if(allowed.length && !allowed.includes(req.user.role)){
            return res.status(403).json({message:'Access denied for your role'});
        }
        next();

    } catch (error) {
        return res.status(401).json({message:'Invalid token, auth denied'})
    }
    
}
export default auth;