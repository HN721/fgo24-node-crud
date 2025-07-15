const userRoute = require("express").Router();
const userController = require("../controllers/users.controller");
userRoute.post("/register", userController.register);
userRoute.get("/", userController.getAllusers);
userRoute.post("/login", userController.loginCtrl);
userRoute.get("/user/:id", userController.findUserByid);
userRoute.patch("/user/:id", userController.updateUsers);
userRoute.delete("/user/:id", userController.deleteUsers);
userRoute.post("/forgot", userController.forgotPasswords);
userRoute.post("/reset/:id", userController.resetPasswords);

module.exports = userRoute;
