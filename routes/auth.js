const router = require("express").Router();
const bcrypt = require("bcrypt");
let user;

router.post("/", async (req,res)=>{
    const u = await user.get(req.body.name);
    if( !u ){
        return res.status(400).send("Invalid name or password 1");
    }
    var passwordOk = await bcrypt.compare(req.body.password, u.password);
    if(!passwordOk){
        return res.status(400).send("Invalid name or password 2");
    }
    const token = await user.generateAuthToken(u);
    res.send(token);
});

module.exports = (userModel) => {
    user = userModel;
    return router;
}