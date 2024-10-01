const express=require('express')
const {authMiddleware}=require("../middleware")
const {Account}=require("../db")
const {mongoose}=require('mongoose')

const router=express.Router()

router.get("/balance", authMiddleware, async (req, res) => {
    const account=await Account.findOne(
        {userId:req.userid})
    res.json({
        balance:account.balance
    })
});
router.post("/transfer", authMiddleware, async (req, res) => {
    const { amount, to } = req.body;

    const account = await Account.findOne({
        userid: req.userid
    });

    if (account.balance < amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userid: to
    });

    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({
        userid: req.userid
    }, {
        $inc: {
            balance: -amount
        }
    })

    await Account.updateOne({
        userid: to
    }, {
        $inc: {
            balance: amount
        }
    })

    res.json({
        message: "Transfer successful"
    })
});

module.exports=router
