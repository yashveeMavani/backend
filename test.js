// console.log("hii");
const express = require('express')
require('dotenv').config()


const app = express()
const port = 3000
app.get("/", (req, res) => {
    console.log("hello")

})
app.get("/wp", (req, res) => {
    res.send("yashvee")

})
app.get("/insta", (req, res) => {
    res.send(`<h2>hiiii yashvee get a palce</h2>`)

})
app.listen(process.env.PORT,()=>{
    console.log(`listening to the ${port}`);
})