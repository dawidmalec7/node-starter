import express, { Router } from "express";
import validateDto from "middleware/validate-dto";
import { updateUserDto } from "dto/user";
import UserController from "controller/user";
import makeApi from "utils/makeApi";
import authenticateToken from "middleware/auth";

const api = makeApi(UserController);

const userRouter: Router = express.Router();

userRouter.get("/", authenticateToken, api("getUsers"));
userRouter.delete("/:id", authenticateToken, api("deleteUser"));
userRouter.get("/:id", authenticateToken, api("getUser"));

// router.put("/:id", validateDto(updateUserDto), userController.updateUser);

export default userRouter;
