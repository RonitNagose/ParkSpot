const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema , reviewSchema} = require("./schema.js");
const Review = require("./models/Review.js");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You need to be Sign in")
        return res.redirect("/login")
    }
    next();
}

module.exports.saveRedirect = async(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl; 
    }
    next();
};

module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the Owner of this Listing");
        res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async(req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    console.log(review);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the Author of this Review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req,res,next)=>{
    // Normalize image fields so the Joi schema receives a proper object.
    const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1635704764831-082c47202c6c?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    try {
        if (req.body && req.body.listing) {
            // Handle form inputs that may come as flat keys like 'image.url' (from name="listing[image.url]")
            // and normalize them into a nested `image` object expected by the schema.
            const listing = req.body.listing;
            // If flat image.url was used, move it into listing.image.url
            if (Object.prototype.hasOwnProperty.call(listing, 'image.url')) {
                listing.image = listing.image || {};
                listing.image.url = listing['image.url'];
                delete listing['image.url'];
            }
            if (Object.prototype.hasOwnProperty.call(listing, 'image.filename')) {
                listing.image = listing.image || {};
                listing.image.filename = listing['image.filename'];
                delete listing['image.filename'];
            }

            // Ensure listing.image exists and has a valid url; if not, set default.
            if (!listing.image || !listing.image.url || String(listing.image.url).trim() === "") {
                listing.image = listing.image || {};
                listing.image.url = DEFAULT_IMAGE_URL;
                listing.image.filename = listing.image.filename || 'ListingImage';
            }
        }

        let{ error } = listingSchema.validate(req.body);
        if(error){
            let errMsg = error.details.map((el)=>el.message).join(",");
            throw new ExpressError(400,errMsg);
        }else{
            // log the normalized image url for debugging
            if (req.body && req.body.listing && req.body.listing.image) {
                console.log("[validateListing] image.url =", req.body.listing.image.url);
            }
            next();
        }
    } catch (err) {
        next(err);
    }
}

module.exports.validateReview = (req,res,next)=>{
    let{ error } = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}