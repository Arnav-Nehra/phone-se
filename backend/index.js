const express=require('express')
const cors=require('cors')

const mainRouter=require('./routes/index')


const app = express()
const port = 3000 
app.use(cors())
app.use(express.json())

app.use("/api/v1",mainRouter)

app.listen(3000,()=>{
    console.log("server listening on 3000")
})