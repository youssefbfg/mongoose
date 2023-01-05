const express=require("express")
const app=express()
app.use(express.json())
const connectDB=require("./config/connectDB")
connectDB()

const port=5000
app.use("/person",require("./routes/person"))

app.listen(port,(err)=>
err?console.log(err):console.log("server is running on port 5000"))