const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
    },
    Poll: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poll"
    }],
    created: {
        type:Date,
        default: Date.now
    }

})
userSchema.pre('save', async function(next){
    try {
        if(!this.isModified('password'))
        return next()
        const hashed = await bcrypt.hash(this.password, 10);
        this.password = hashed;
        return next();
    } catch (error) {
        return next(error)
    }
})
userSchema.methods.comparePassword = async function(attempt, next){
    try {
        return await bcrypt.compare(attempt, this.password);
    } catch (error) {
        return next(error)
    }
}
module.exports = mongoose.model('User', userSchema);
