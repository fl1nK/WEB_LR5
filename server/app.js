const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()

const authRouter = require('./routes/authRouter')
const infoRouter = require('./routes/infoRouter')
const corsMiddleware = require('./middleware/corsMidelware')


const app = express()

const PORT = process.env.PORT || 3001

mongoose.set('strictQuery', false);
mongoose
    .connect("mongodb+srv://vlad:pass123@cluster0.g8rarqs.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.log(error));

app.listen(PORT, ()=> {
    console.log(`Server starting on port ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(corsMiddleware)
app.use("/api/auth", authRouter)
app.use("/api", infoRouter)
