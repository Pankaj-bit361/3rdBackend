const jwt=require("jsonwebtoken")
const authtoken=(req,res,next)=>{

    let token=req.headers.authorization
    if(token){
        token=token.split(" ")[1]
        try {
            jwt.verify(token, 'masai', async(err, decoded)=> {
                if(decoded){
                   
                    req.body.authorID=decoded.authorID,
                    req.body.author=decoded.author
                    next()
                }else{
                    res.send({"err":err.message})
                }
              
              })
        } catch (error) {
            res.send({"err":error.message})
        }
    }

}

module.exports={
    authtoken
}