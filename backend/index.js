const express=require('express')

const mainRouter=require('./routes/index')
const bodyParser=require('body-parser')
const authMiddleware=require('./middleware')

const cors=require('cors')

const app = express()

const port = 3000 

app.use(bodyParser)
app.use(cors)
app.use("/api/v1",mainRouter)

app.listen(port)