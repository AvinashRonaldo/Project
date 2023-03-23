const User  = require(__dirname+"/../models/user")

var isAuthenticated = async(req,res,next) => {
    if(req.session.userid!=null){
        next();
    }
    else {
        res.redirect("/login");
    }
}

module.exports = isAuthenticated;


