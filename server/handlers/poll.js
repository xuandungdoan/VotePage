const db = require('../models')

exports.showPoll = async (req, res, next) => {
    try {
        const findAll = await db.Poll.find().populate('user',['id', 'username']);
        res.status(200).json(findAll);
    } catch (error) {
        error.status = 400;
        next(error);
    }
}
exports.createPoll = async (req, res, next) => {
    const { id } = req.decoded;
    const { question, options } = req.body;
    try {

        console.log("id ne", req.decoded);
        const user = await db.User.findById(id)
        const newPoll = await db.Poll.create({
            question,
            user,
            options: options.map(e => ({ option: e, vote: 0 }))

        });
        user.polls.push(newPoll._id);
        await user.save();
        return res.status(201).json({ ...newPoll._doc, user: user._id, test:'retststss' });

    } catch (error) {

        next(error);
    }
}
exports.usersPolls = async (req, res, next) => {

    try {
        const { id } = req.decoded;
        const result = await db.User.findById(id).populate('polls');
        res.status(200).json(result.polls);
    } catch (error) {
        error.status = 400;
        next(error)
    }
}
exports.updatePoll = async (req, res, next) => {
    const { id } = req.params;
    const { question, options } = req.body;
    try {
        const result = await db.Poll.findByIdAndUpdate(id)
    } catch (error) {
        next(error)
    }

}
exports.deletePoll = async (req, res, next) => {
    const { id: idPoll } = req.params;
    const {id: idUser} = req.decoded
    try {
        let user = await db.User.findById(idUser)
        if(user.polls) { // not sure if necessary either...
          user.polls = user.polls.filter(userPoll => {
            return userPoll._id.toString() !== idPoll.toString() // not sure if necessary to use toString()
          })
        }
        const poll = await db.Poll.findById(idPoll);
        if(!poll) throw new Error('cant find poll');
        if(poll.user.toString() !== idUser) throw new Error('cant delete with wrong user');
        await poll.remove();
        await user.save();
        res.status(202).json(poll)
    } catch (error) {
        next(error)
    }

}
exports.getPoll = async (req, res, next) => {
    const {id} = req.params;
    try {
        const result = await db.Poll.findById(id).populate('user', ['id', 'username']);
        if(!result) throw new Error('no poll found with this id');
        res.status(200).json(result);
    } catch (error) {

        next(error);
    }
}

exports.vote = async (req, res, next) => {
    try {
        const {id: pollId} = req.params;
        const {id: userId} = req.decoded;
        const {anwser} = req.body
        
        if(anwser){
            const poll = await db.Poll.findById(pollId);
            const vote = poll.options.map( e => {
                if(e.option === anwser){ 
                    return {
                        option: e.option,
                        _id: e._id,
                        votes: e.votes + 1
                 };
                 }
                else{
                    return e;
                }
            })
            if(poll.voted.filter(user => user.toString() === userId).length <= 0){
                poll.voted.push(userId);
                poll.options = vote;
                await poll.save();
                res.status(202).json(poll);
            }
            else{
                throw new Error('already voted')
            }
        }
        else{
            throw new Error('invaild anwser!')
        }
    } catch (error) {
        next(error);
    }
}