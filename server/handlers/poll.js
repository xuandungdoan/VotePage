const db = require('../models')

exports.showPoll = async (req, res, next) => {
    try {
        const findAll = await db.Poll.find();
        res.status(200).json(findAll);
    } catch (error) {
        error.status = 400;
        next(error);
    }
}
exports.createPoll = async (req, res, next) => {
    const {id} = req.decoded;
    const {question, options} = req.body;
    try {
        
        
        console.log("id ne", req.decoded);
        const user = await db.User.findById(id)
        const newPoll = await db.Poll.create({
            question, 
            user,
            options: options.map(e => ({option:e, vote:0}))
    });
        res.status(201).json(newPoll);
    } catch (error) {
        
        next(error);
    }
}