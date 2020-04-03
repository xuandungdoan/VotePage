// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
// const optionSchema = new Schema({
//     option: String,
//     votes:{
//         type:Number,
//         default:0
//     }
// })
// const pollSchema = new Schema({
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'User'
//     },
//     question: String,
//     options:[optionSchema],
//     voted: [{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
//     created: {
//         type: Date,
//         default: Date.now
//     }
// })

// module.exports = mongoose.model('Poll', pollSchema);

const mongoose = require("mongoose");
const User = require("./user");

const optionSchema = new mongoose.Schema({
  option: String,
  votes: {
    type: Number,
    default: 0
  }
});

const pollSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  created: {
    type: Date,
    default: Date.now
  },
  question: String,
  options: [optionSchema],
  voted: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

pollSchema.pre("remove", async function(next) {
  try {
    const user = await User.findById(this.user._id);
    user.polls = user.polls.filter(
      poll => poll._id.toString() !== this._id.toString()
    );
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model("Poll", pollSchema);
