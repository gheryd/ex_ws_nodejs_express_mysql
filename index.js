const express = require('express');
const config = require('config');

if( !config.get("jwtPrivatKey") ){
    console.error("jwtPrivatKey is not setted");
    process.exit(1);
}

process.on('unhandledRejection', err =>{
    console.error('unhandlerRejection', err);
});

const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());

async function init(){
    const dbConn = await mysql.createConnection( config.get("db")['connection'] );
    require("./startup/routes")(app, dbConn);
    app.listen(3000, ()=>console.log("listening on 3000..."));
}


init();

console.log("Express test");