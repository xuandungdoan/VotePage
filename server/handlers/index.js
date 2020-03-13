module.exports = {
    ...require('./auth'),
    ...require('./poll')
}

module.exports.notFound = (req, res, next) => {
    let err = new Error('Not found !!!');
    err.status = 404;
    next(err);
}

module.exports.error = (err, req, res, next) => {
    res.status(err.status || 500).json({
        err: err.message || 'something went wrong!'
    })
}
