const products = require("../routes/products");
const auth = require("../routes/auth");
const Product = require("../models/product");
const User = require("../models/user");


module.exports = function(app, dbConn){
    app.use("/api/products", products(new Product(dbConn)));
    app.use("/api/auth", auth(new User(dbConn)));
};