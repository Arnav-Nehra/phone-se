const express = require('express')
const router = express.Router()
const zod = require('zod')
const { User, Account } = require("../db");
const JWT_SECRET=require("../config").JWT_SECRET
const jwt = require("jsonwebtoken");

const {authMiddleware}=require('../middleware');

const signupBody = zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

router.post("/signup",async(req,res)=>{
   
    const {success} = signupBody.safeParse(req.body) 
   
    if(!success){
        return res.status(411).json({
            message: "email already taken / Incorrect Inputs"
        })
    }
    
    const existingUser = await User.findOne({
        username:req.body.username
    })
    if(existingUser){
        return res.status(411).json({
            message: "email already taken"
        })
    }

    const dbUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    const userId=dbUser._id
    await Account.create({
        userId:userId,
        balance:1+Math.random()*10000
    }) 

    const token = jwt.sign({
        userId
    },JWT_SECRET)

    res.json({
        message: "User Created successfully",
        token: token
    })
})

const signinBody = zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post('/signin',async(req,res)=>{
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
            userId:user._id
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
const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/update", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    
    if (!success) {
         res.status(411).json({
            message: "Error while updating information"
        })
        return ;
    }
    await User.updateOne(
        { "_id": req.userid },
        { $set: req.body }
    )
    .then(() => {
        res.json({
            message: "Updated successfully"
        });
    })
    .catch((err) => {
        res.status(500).json({
            message: "Error updating!",
            error: err.message
        });
    });
    
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