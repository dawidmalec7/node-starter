import express from "express";
import validateDto from "middleware/validate-dto";
import { createUserDto, updateUserDto } from "dto/user";
import UserController from "controller/user";
import makeApi from "utils/makeApi";
import authenticateToken from "middleware/auth";

const api = makeApi(UserController);

const userRouter = express.Router();
userRouter.get("/:id", api("getUser"));
userRouter.get("/", authenticateToken, api("getUsers"));
userRouter.delete("/:id", api("deleteUser"));
userRouter.post("/", validateDto(createUserDto), api("createUser"));
// router.put("/:id", validateDto(updateUserDto), userController.updateUser);

export default userRouter;
