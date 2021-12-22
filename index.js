const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")
require('dotenv').config()
const app = express()

const userRoute = require("./routes/userRoute")
const employeeRoute = require("./routes/employeeRoute")
const { customError } = require("./middlewares/customMessage")

app.use(express.json())
app.use(cors())
app.use(fileUpload())

app.use("/api" ,userRoute)
app.use("/api", employeeRoute)

app.use(customError)

app.listen( process.env.PORT || 8000, ()=>{
    console.log("Server is up")
})