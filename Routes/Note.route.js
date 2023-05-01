

const express=require("express")
const { NoteModel } = require("../Models/Note.model")
const NoteRouter=express.Router()



NoteRouter.get("/",async(req,res)=>{
const {maxcomments,mincomments,device,page,_id}=req.query
const {authorID}=req.body

let query={authorID:authorID}
if(maxcomments){
query.no_of_comments={$lte:maxcomments}
}
if(mincomments){
    query.no_of_comments={$gte:mincomments}
}

let skip
if(page){

    if(page<=1){
        page=1
    }
        skip=(page-1)*3
    

}
// console.log(req.body)
console.log(query,"line 18")
    try {
        
      let notes= await NoteModel.find(query).sort({no_of_comments:-1}).skip(skip).limit(3)
      res.send(notes)
    } catch (error) {
        res.send({"err":error.message})
    }
})


NoteRouter.get("/top",async(req,res)=>{
    let {authorID}=req.body
    let {page}=req.query
    if(page){
        if(page<=1){
            page=1
        }
    }
  let skip=(page-1)*3
    try {
        let user= await NoteModel.find({authorID}).sort({no_of_comments:-1}).skip(skip).limit(3)
        res.send(user)
    } catch (error) {
        res.send({"err":error.message})
    }

})

NoteRouter.get("/:id",async(req,res)=>{
    const {id}=req.params

    try {
        let note=await NoteModel.findOne({_id:id})
        console.log(note,"line 66")
        res.send(note)
    } catch (error) {
        res.json(error.message)
    }

})

 NoteRouter.post("/add",async (req,res)=>{
console.log(req.body)
    try {
        let notes= await NoteModel(req.body)
        await notes.save()
        res.send({"msg":"Note added successfully"})
    } catch (error) {
        res.send({"err":error.message})
    }
 })

NoteRouter.patch("/update/:id",async(req,res)=>{
let {id}=req.params
let data=req.body
console.log(data)
try {
    let notes= await NoteModel.findByIdAndUpdate({_id:id},data)
    res.send({"msg":notes,"msg2":"data updated successfully"})
} catch (error) {
    res.send({"err":error.message})
}

})

NoteRouter.delete("/delete/:id",async(req,res)=>{
    let {id}=req.params

    try {
        let notes= await NoteModel.findByIdAndDelete({_id:id})
        res.send({"msg":notes,"msg2":"data deleted successfully"})
    } catch (error) {
        res.send({"err":error.message})
    }
    
    })
    

module.exports={
    NoteRouter
}