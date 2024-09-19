const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://arnavnehra1:GgbMNEKSDql7B3po@cluster0.rue5u.mongodb.net/paytm')

const UserSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50,
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }
})

const AccountsSchema = mongoose.Schema({ 
    userId:{
        type:String,
        required:true,
    },    
    balance:{
        type:Number,
        required:true
    }
}
)

const User=mongoose.model(UserSchema)
const Account=mongoos.model(AccountsSchema);
module.exports={
    User,Account
}