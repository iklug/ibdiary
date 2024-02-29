
const checkAuth = (req,res,next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.status(401).json('user not authenticated');
    }
};

const checkNoAuth = (req,res,next) => {
    if(req.isAuthenticated()){
        res.status(401).json('already logged in');
    } else {
        next();
    }
};

module.exports.checkAuth = checkAuth;
module.exports.checkNoAuth = checkNoAuth;