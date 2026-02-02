const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingControllers = require("../controllers/listings.js");

router.route("/")
   .get(wrapAsync(listingControllers.index))
   .post(isLoggedIn, upload.single('listingImage'), validateListing, wrapAsync(listingControllers.addListing));


router.post("/searchShow", wrapAsync(listingControllers.searchShowListing));

// NEW
router.get('/new', isLoggedIn, listingControllers.newListing); 

// EDIT
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingControllers.editListing));

router.route("/:id")
   .get(wrapAsync(listingControllers.showListing))
   .put(isLoggedIn, isOwner,upload.single('listingImage'), validateListing, wrapAsync(listingControllers.updateListing))
   .delete(isLoggedIn, isOwner, wrapAsync(listingControllers.deleteListing));
   

module.exports = router;