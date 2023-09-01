import jwt from "jsonwebtoken";

export const verifyUser = async(req, res, next) => {
    try{
        let token = req.header("Authorization");
        if(!token){
            return res.status(403).send("Access denied");
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }
        console.log(token);
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifyToken;
        next();
    }
    catch(err){
        console.log("middleware error");
        res.status(500).json({error: err.message});
    }
}
