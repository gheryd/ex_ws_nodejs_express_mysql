module.exports = (req,res,next) => {
    if(!req.user.isAdmin) 
        return res.status(403).send("access denied. need admin permission");
    next();
}