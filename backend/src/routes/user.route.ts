import { Router } from "express";

import UserController from "../controller/user.controller";

const userRouter = Router();

userRouter.post("/register", UserController.userRegister);
userRouter.put("/updateUser", UserController.updateUserDetails);
userRouter.get("/getUser", UserController.getAllUser);
userRouter.delete("/delete/:id", UserController.deleteUser);

export default userRouter;
