const db = require('../models');

exports.register = async (req, res , next) => {
    try {
        const user = await db.User.create(req.body);
        const {username, id} = user;
        res.json({username, id});
    } catch (error) {
        next(error)
    }
    
}
exports.login =  async (req, res, next )=>{
    try {
        const user = await db.User.findOne({username: req.body.username});
        const check = user.comparePassword(req.body.password)
        const {username, id} = user
        if(check){
            res.json({id, username});
        }
        else{
            throw new Error('invalid Username or password')
        }
    } catch (error) {
        next(error);
    }
}