//authRouter.route("/users").post(register)
import express from "express";
import {create} from "../Controllers/toDoController.js";

export const todoRouter = express.Router()
todoRouter.route("/user").post(create)

