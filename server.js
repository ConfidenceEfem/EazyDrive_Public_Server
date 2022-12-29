const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const app = express()
const router = require("./Router")
const port = 2022
const cors = require("cors")

const url = "mongodb://localhost/EazyDriveDB"

const url1 = "mongodb+srv://eazydrive:eazydrivepassword@cluster0.wp1jpye.mongodb.net/EazyDB?retryWrites=true&w=majority"

app.use(express.json())

app.use(cors())
mongoose.connect(url1).then(()=>{
    console.log("Connected to Eazy Drive DB")
})

app.get("/", (req,res)=>{
    res.send("Welcome to Eazy Drive")
})

app.use("/api", router);

app.listen(port, ()=>{
    console.log("Listening to port", port)
})