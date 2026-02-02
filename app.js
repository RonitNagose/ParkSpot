if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}
// console.log(process.env);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema , reviewSchema} = require("./schema.js")
const Review = require("./models/Review.js");
const session = require( "express-session");
const MongoStore = require('connect-mongo').default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User.js")


const listingRoutes = require("./routes/listings.js")
const reviewRoutes = require("./routes/reviews.js")
const userRoutes = require("./routes/user.js");

const dbUrl = process.env.ATLASDB_URL;

main()
.then((res)=>{
    console.log("Connected to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
};

const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter : 24 * 3600
});


store.on("error",()=>{
    console.log("Error in Mongo Session Store",err);
})

app.engine("ejs",ejsMate);

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
// Serve uploaded files from /uploads URL path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const sessionOptions = {
    store ,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie:{
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : Date.now() + 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride("_method"))

const validateReview = (req,res,next)=>{
    let{ error } = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}


app.get("/demouser", async(req,res)=>{
    let fakeUser = new User({
        email:"student@gmail.com",
        username:"Ronit Nagose",
    });

    let registeredUser = await User.register(fakeUser,"HelloWorld");
    res.send(registeredUser);
})

app.use("/listings",listingRoutes)

//Review

app.use("/listings/:id/reviews",reviewRoutes)
app.use("/",userRoutes);;


app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { err });
});


// Global handlers to log unhandled rejections and exceptions so the process doesn't silently crash.
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Note: Not exiting process to keep server running; consider restarting the process manager in production.
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown:', err);
    if (err && err.stack) console.error(err.stack);
    // Note: continuing after an uncaught exception may leave the process in an inconsistent state.
    // For safety in production, consider exiting and letting a process manager restart the server.
});

app.listen(8080,()=>{
    console.log("App is Listening to Port 8080");
})

