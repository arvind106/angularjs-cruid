const route = require("express").Router();
const userC = require("../controllers/userController");

route.post("/user",userC.register);
route.get("/user",userC.users);
route.get("/user/:user_id",userC.edit);
route.delete("/user/:user_id",userC.delete);
route.patch("/user/:user_id",userC.update);

module.exports=route;
