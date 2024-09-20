const express = require('express')
const zod = require('zod')
const JWT_SECRET= "user"
const {authMiddleware}=require('../middleware');
const router = express.Router()

const signupSchema = zod.object({
    username:zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})
router.post("./signup",async(req,res)=>{
    const {success} = signupSchema.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message: "email already taken / Incorrect Inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username
    })
    if(user.__id){
        return res.json({
            message: "email already taken/ incorrect inputs"
        })
    }

    const dbUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    const userId = dbUser.__id
    await Account.create({
        userId,
        balance:1+Math.random()*10000
    }) 
    const token = jwt.sign({
        userId: userId
    }, JWT_SECRET)
    res.json({
        message: "User Created successfully",
        token: token
    })
})

const signinBody = zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post('/siginin',async(req,res)=>{
    const {success} = signinBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message: "Incorrect Inputs"
        })
    }
    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(user){
        const token = jwt.sign({
            userId:user.__id
        },JWT_SECRET) 
        res.json({
            token:token
        })
        return;
    }
    res.status(411).json({
        message:"Error while logging in"
    })

})
const updatedBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})
router.use("./update",authMiddleware,async(req,res)=>{
    const {success}=updatedBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:"error while updating information"
        })
    }
    await User.udpateOne(req.body,{
        __id:req.userId
    })
    res.json({
        message:"updated successfully"
    })
})
router.get("/bulk",async(req,res)=>{
    const filter = req.query.filter || ""
    const users = await User.find({
        $or: [
        {
            firstName:{
                "$regex": filter
            }
        },
        {
            lastName: {
            "$regex":filter
            }
        }
    ]
    })
   res.json({
    user:users.map(user=>({
        username:user.username,
        firstName:user.firstName,
        lastName:user.lastName,
        __id:user.__id
    }))
   })
})
module.exports=router