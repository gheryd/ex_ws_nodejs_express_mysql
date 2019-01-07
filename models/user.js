const jwt = require("jsonwebtoken");
const config = require("config");

class User{

    constructor(db){
        this.db = db;
    }

    async get(name){
        const [rows] = await this.db.execute("SELECT * FROM user WHERE name=?",[name]);
        return (rows.length>0 && rows[0]) || null;
    } 

    generateAuthToken(user){
        return jwt.sign({
                name: user.name,
                isAdmin: user.is_admin 
            },
            config.get("jwtPrivatKey")
        );
    }
    
    validate(u){
        const schema = {
            name: Joi.string().min(3).max(10),
            password: Joi.string().min(5).max(255) 
        };
        const {error} = Joi.validate(u, schema);
        return error ? error.details[0].message : null;
    }
}

module.exports = User;
