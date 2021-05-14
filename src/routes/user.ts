import express from "express";
import validateDto from "middleware/validate-dto";
import { createUserDto, updateUserDto } from "dto/user";
import UserController from "controller/user";
import makeApi from "utils/makeApi";

// const makeAPI = (methodName: string): any => {
//   return function (req: any, res: Response, next: any) {
//     const controller = new UserController(req.container.cradle);
//     //@ts-ignore
//     return controller[methodName](req, res, next);
//   };
// };
const api = makeApi(UserController);

const userRouter = express.Router();
userRouter.get("/:id", api("getUser"));
// router.get("/users", userController.getUsers);
// router.delete("/", userController.deleteUser);
userRouter.post("/", validateDto(createUserDto), api("createUser"));
// router.put("/:id", validateDto(updateUserDto), userController.updateUser);

export default userRouter;
