let users = []

function authUser(req,res,next){
    const user = req.body.username
    if(users.includes(user)){
        res.redirect("login");
    }else{
        users.push(user);
        res.cookie("name", user);
        res.redirect("/chat");
    }
}

function exist(req,res,next){
    const {name} = req.cookies;
    if(!(users.includes(name))){
        res.redirect("/login");
    }

    next();
}

module.exports = { authUser,exist}