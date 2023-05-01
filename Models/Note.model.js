const mongoose  = require("mongoose");

const Noteschema=mongoose.Schema({
    "title":{type:String,required:true},
    "body":{type:String,required:true},
    "device":{type:String,required:true},
    "no_of_comments":{type:Number,required:true},
    "author":{type:String,required:true},
    "authorID":{type:String,required:true},
},{
    versionKey:false
})

const NoteModel=mongoose.model("notes",Noteschema)

module.exports={
    NoteModel
}