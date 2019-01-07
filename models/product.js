const Joi = require('joi');


class Product {
    
    constructor(db){
        this.db = db;
    }

    async getAll() {
        const [rows, fields] = await this.db.execute("SELECT * FROM product");;
        return rows;
    }

    async get(id) {
        const [rows] = await this.db.execute("SELECT * FROM product WHERE id=?",[id]);
        return (rows.length>0 && rows[0]) || null;
    }

    async add(p){
        const [res] = await this.db.query("INSERT INTO product SET name=?, price=?", [p.name, p.price]);
        return this.get(res.insertId);
    }

    async update(p){
        const {id, ...setObj} = p;
        const sql = "UPDATE product SET ? WHERE id=?";
        const [res] = await this.db.query(sql, [setObj, id]);
        return res.affectedRows ? this.get(id) : null;
    }

    async remove(id){
        const [res] = await this.db.query("DELETE FROM product WHERE id=?", [id]);
        return res.affectedRows > 0;
    }
    

    validate(p){
        const schema = Joi.object().keys({
            id: Joi.number().integer(),
            name: Joi.string().min(3).max(30).required(),
            price: Joi.number().precision(2).required()
        });
        const {error} = Joi.validate(p, schema);
        if(error){
            return error.details[0].message;
        }
        return null;
    }
}



module.exports = Product;