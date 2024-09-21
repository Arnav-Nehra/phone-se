const express=require('express')

const mainRouter=require('./routes/index')

// const cors=require('cors')

const app = express()

const port = 3000 

app.use(express.json())
// app.use(cors)
app.use("/api/v1",mainRouter)

app.listen(3000,()=>{
    console.log("server listening on 3000")
})