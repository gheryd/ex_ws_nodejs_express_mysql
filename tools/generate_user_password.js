const bcrypt = require("bcrypt");

const saltRounds = 10;

const args = process.argv.slice(2);
if(args.length==0){
    console.error("pass plaintext password in command line");
    process.exit(1);
    return;
}
const plaintextPassword = args[0];

bcrypt.hash(plaintextPassword, saltRounds, (err, hash)=>{
    console.log(hash);
});
console.log("calculating hash...");