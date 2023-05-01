
const express=require("express")
const { connection } = require("./db")
const { UserRouter } = require("./Routes/User.route")
const { authtoken } = require("./middleware/auth.middleware")
const { NoteRouter } = require("./Routes/Note.route")
const cors=require("cors")


const app=express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("homepage")
})


app.use("/users",UserRouter)
app.use(authtoken)

app.use("/notes",NoteRouter)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }

    console.log(`connected to the port ${process.env.port}`)
})