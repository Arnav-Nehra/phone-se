const express=require('express')
const router=express.Router()
const zod=require('zod')

const signupSchema=zod.object({
    username:zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})
router.post("./signup",async(req,res)=>{
    const body=req.body
    const {success}=signupSchema.safeParse(req.body)
    if(!success){
        res.json({
            message:"email already taken / Incorrect Inputs"
        })
    }
    const user=User.findOne({
        username:body.username
    })
    if(user.__id){
        return res.json({
            message:"email already taken/ incorrect inputs"
        })
    }
    const dbUser=await User.create(body);
    const token=jwt.sign({
        userId:dbUser.__id
    },JWT_SECRET)
    res.json({
        message:"User Created successfully",
        token:token
    })
})
module.exports={router}
