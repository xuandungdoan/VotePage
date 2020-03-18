// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     username: {
//         type: String,
//         unique: true,
//         required: true,
//         trim: true,
//         minlength: 3,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     Polls: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Poll"
//     }],
//     created: {
//         type:Date,
//         default: Date.now
//     }

// })
// userSchema.pre('save', async function(next){
//     try {
//         if(!this.isModified('password'))
//         return next()
//         const hashed = await bcrypt.hash(this.password, 10);
//         this.password = hashed;
//         return next();
//     } catch (error) {
//         return next(error)
//     }
// })
// userSchema.methods.comparePassword = async function(attempt, next){
//     try {
//         return await bcrypt.compare(attempt, this.password);
//     } catch (error) {
//         return next(error)
//     }
// }
// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  polls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poll' }],
});

userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function(attempt, next) {
  try {
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    return next(err);
  }
};

module.exports = mongoose.model('User', userSchema);