import { Router } from "express";
import { registerUserController, verifyEmailController } from "../Controllers/UserControllers.js";

const UserRouter = Router()

UserRouter.post("/register",registerUserController)
UserRouter.post("/verify-email",verifyEmailController)

export default UserRouter