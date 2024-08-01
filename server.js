//es module method of importing and exporting
import express from "express";
import {PORT} from "./Config/constants.js";
import notFound from "./Middlewares/notFound.js";
import errHandler from "./Middlewares/errHandler.js";
import {todoRouter} from "./Routes/todoRouter.js";

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Home Page"
    })
})

app.use('/todo', todoRouter)

// Linking middlewares to express application
app.use(notFound)
app.use(errHandler)



const startApp = ()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is listening on port ${PORT} `)

    })
}

startApp()