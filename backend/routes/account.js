const express=require('express')
const router=express.Router()
const authMiddleware=require("./middleware")

router.get("/balance",authMiddleware,async(req,res)=>{
    const account=User.findOne({
        userId:req.userId
    })
    res.json({
        balance: account.balance
    })
})

module.exports=router