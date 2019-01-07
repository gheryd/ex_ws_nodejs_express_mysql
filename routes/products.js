const router = require('express').Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

let product;

router.get("/", auth, async (req,res)=>{
    res.send(await product.getAll());
});

router.get("/:id", auth, async (req, res)=>{
    const id = parseInt(req.params.id);
    if( !id || id!=req.params.id){
        return res.status(400).send(`wrong id '${req.params.id}'`);
    }
    const p = await product.get(id);
    if( !p ){
        return res.status(404).send("product not found");
    }
    res.send(p);
});

router.post("/",  [auth, admin], async (req, res)=>{
    const p = req.body;
    const newP = await product.add(p);
    res.send( newP );
});

router.put("/:id", [auth, admin], async (req, res)=>{
    const id = parseInt(req.params.id);
    if( !id || id!=req.params.id){
        return res.status(400).send(`wrong id '${req.params.id}'`);
    }
    const p = await product.update({...req.body, id});    
    if(!p){
        return res.status(404).send("product not found");
    }
    res.send(p);
});

router.delete("/:id", [auth, admin], async (req, res)=> {
    const id = parseInt(req.params.id);
    if( !id || id!=req.params.id){
        return res.status(400).send(`wrong id '${req.params.id}'`);
    }
    const deleted = await product.remove(id);
    if(!deleted){
        return res.status(404).send("product not found");
    }
    res.send("ok");
});

module.exports = function(productModel){
    product = productModel;
    return router;
}