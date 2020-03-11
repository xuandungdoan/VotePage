const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const optionSchema = new Schema({
    options: String,
    votes:{
        type:Number,
        default:0
    }
})
const pollSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    question: {type:String},
    options:[optionSchema],
    voted: [{type:mongoose.Schema.Types.ObjectId, ref:'User'}]

})
module.exports = mongoose.model('User', userSchema);