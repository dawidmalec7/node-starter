import express from "express";
import validateDto from "middleware/validate-dto";
import makeApi from "utils/makeApi";
import AuthController from "controller/auth";
import { loginDto, registerDto } from "dto/auth";

const api = makeApi(AuthController);

const authRouter = express.Router();

authRouter.post("/login", validateDto(loginDto), api("login"));
authRouter.post("/register", validateDto(registerDto), api("register"));

export default authRouter;
