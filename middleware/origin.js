const middleware = {};

middleware.origin = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept,Authorization,x-auth-token'
    );
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
    next();
};

module.exports = middleware;
