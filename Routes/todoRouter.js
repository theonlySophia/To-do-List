//authRouter.route("/users").post(register)
import express from "express";
import {create, update, getOneTask, getAllTasks, deleteTask, deleteAllTasks} from "../Controllers/toDoController.js";


export const todoRouter = express.Router()
todoRouter.route("/user").post(create)
todoRouter.route("/user/update").post(update)
todoRouter.route("/user/:id").get(getOneTask)
todoRouter.route("/user").get(getAllTasks)
todoRouter.route("/user/deleteTask").delete(deleteTask)
todoRouter.route("/user/deleteAllTasks").delete(deleteAllTasks)



