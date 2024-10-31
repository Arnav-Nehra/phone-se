const mongoose=require('mongoose')

mongoose.connect('your-mongo-url')

const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50,
    },
    lastName:{
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

const AccountsSchema = new mongoose.Schema({ 
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },    
    balance:{
        type:Number,
        required:true
    }
}
)
const Account=mongoose.model('Account',AccountsSchema);
const User=mongoose.model('User',UserSchema)

module.exports={
    User,Account
}
