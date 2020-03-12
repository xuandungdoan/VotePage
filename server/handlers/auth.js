const jwt = require('jsonwebtoken');

const db = require('../models');

exports.register = async (req, res , next) => {
    try {
        const user = await db.User.create(req.body);
        const {username, id} = user;
        const token = jwt.sign({id, username}, process.env.SECRET)
        res.status(201).json({username, id, token});
    } catch (error) {
        if(error.code === 11000)
        error.messsage = "sorrry this name has been taken";
        next(error);
    }
    
}
exports.login =  async (req, res, next )=>{
    try {
        const user = await db.User.findOne({username: req.body.username});
        const check = user.comparePassword(req.body.password)
        const {username, id} = user
        if(check){
            const token = jwt.sign({id, username}, process.env.SECRET);
            res.json({id, username, token});
        }
        else{
            throw new Error()
        }
    } catch (error) {
        error.message = 'invalid Username or passwords';
        next(error);
    }
}