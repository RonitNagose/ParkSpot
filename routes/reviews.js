const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema , reviewSchema} = require("../schema.js")
const Listing = require("../models/listing.js");
const Review = require("../models/Review.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js")

const reviewControllers = require("../controllers/review.js");


// post review route
router.post("/",validateReview,isLoggedIn,validateReview,wrapAsync(reviewControllers.createReview));

// Delete Review Route
router.delete(
    "/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewControllers.destroyReview));

module.exports = router;