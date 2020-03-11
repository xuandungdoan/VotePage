const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        minlength:3,
    },
    password: {
        type:String,
        required:true,
    },
    Poll:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poll"
    }
    
})
module.exports = mongoose.model('User', userSchema);
