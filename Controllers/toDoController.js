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
        (username, taskname, description)
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

// //update controller
// const update = AsyncHandler(async(req, res, next)=>{
//     try{
//         const {id} = req.body;
//         if(id){     
//             const fetchUser =
//             await sql `SELECT * from todo WHERE id = ${id}`;
//             const user = fetchUser[0]; //this returns first result of fetchUser function
//             if(user){
//                 await sql `UPDATE todo SET username = ${username}, taskname = ${taskname}, description = ${description}
//                 WHERE id = ${user.id}`;
//                 return res.status(200).json({
//                     message: "task update successful"
//                 });
//             }
//         } else{
//             return res.status(404).json({
//                 message: "update failed"
//             })
//         }

//     }catch(error){
//         next(error);
//     }
// })



export {create};