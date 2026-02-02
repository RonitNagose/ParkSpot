const User = require("../models/User");

module.exports.signup = (req,res)=>{
    res.render("./user/signUp.ejs");
}

module.exports.login = (req,res)=>{
    res.render("./user/login.ejs");
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logout Successfully");
        res.redirect("/listings");
    })
}

module.exports.signupForm = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to ParkSpot");
            res.redirect("/listings");
        })
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
}

module.exports.loginForm = async(req,res)=>{
    req.flash("success","Welcome back to the ParkSpot");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

module.exports.redirectToHomePage = (req,res)=>{
    res.render("./listings/home.ejs")
}
