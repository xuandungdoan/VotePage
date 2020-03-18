const router = require('express').Router();
const handle = require('../handlers');
const auth = require('../middlewares/auth')
router
.route('/')
.get(handle.showPoll)
.post(auth, handle.createPoll);

router.get('/user', auth, handle.usersPolls);

router.route("/:id")
.get(handle.getPoll)
.put(handle.updatePoll)
.delete(auth ,handle.deletePoll)
.post(auth, handle.vote)
module.exports = router;