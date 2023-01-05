const mongoose=require("mongoose")
const schema=mongoose.Schema

const PersonSchema= new schema({
    name:{
        type:String
    },
    age:{
        type:Number

  
    },
    favoriteFood:{
        type:Array
    }
})

module.exports=Person=mongoose.model("persons",PersonSchema)