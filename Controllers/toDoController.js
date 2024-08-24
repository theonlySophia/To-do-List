// Creating a To-Do List
// 1) Create a To-do
import AsyncHandler from "express-async-handler";
import {sql} from "../Config/db.js";

const create = AsyncHandler(async(req,res, next)=>{
    try{
        const{id, username, taskname, description, status, taskdate} = req.body;
        if(!username || !taskname || !description){
            res.status(400);
            throw new Error("Invalid Input");
        }
        const user = await sql`INSERT into todo
        (username, taskname, description )
        VALUES
        (${username}, ${taskname}, ${description})
        returning id, username, taskname, description, status, taskdate`;
        return res.status(201).json({
            user
        });

    }catch(error){
        next(error);
    }


}) 

//update controller
const update = AsyncHandler(async(req, res, next)=>{
    try{
        const {id, username, taskname, description, status, taskdate } = req.body;
        console.log("fine too");
        if(!id){     
            res.status(400);
            throw new Error("id required");
        } 

        const fetchUser =
            await sql `SELECT * from todo WHERE id = ${id}`;
            if(fetchUser.length == 0){
                return res.status(404).json({
                    message: "User not found"
                });
            }
            const user = fetchUser[0]; //this returns first result of fetchUser function

    

            if(user.id == id){
                await sql `UPDATE todo SET username = ${username}, taskname = ${taskname}, description = ${description}
                WHERE id = ${user.id}`;
                console.log("perfect here");
                return res.status(200).json({
                    message: "task update successful"
                });
                
            } else{
            return res.status(404).json({
                message: "update failed"
            })
        }
        

    }catch(error){
        next(error);
    }
})

const getAllTasks = AsyncHandler(async(req,res, next)=>{
    try{
        const getTodos = await sql `SELECT * from todo`;
        return res.status(200).send(getTodos);
    }catch(error){
        next(error);
    }
})

const getOneTask = AsyncHandler(async(req,res,next)=>{
    try{
        const id = req.params.id;
        // const id = req.body;
        console.log("new day same good");
        if(!id){
            throw new Error("User id required");
        }
        console.log("new day great good");

        const getOnlyOne =  await sql `SELECT * from todo WHERE id = ${id}`;
        if(getOnlyOne.length == 0){
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.send(getOnlyOne[0]);

    }catch(error){
        next(error);
    }
})

// delete a task controller
const deleteTask = AsyncHandler(async(req, res, next) =>{
    try{
        const {id} = req.body;
        if(!id){
            throw new Error("User id required");
        }

        const deleteOne = await sql `delete from todo where id = ${id} returning *`;
        return res.status(200).send(deleteOne); 

    }catch(error){
        next(error);
    }

})
//delete all tasks controller



export {create, update, getOneTask, getAllTasks, deleteTask};