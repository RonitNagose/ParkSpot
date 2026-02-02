const Listing = require("../models/listing.js");
const axios = require("axios");

module.exports.index = async(req,res)=>{
    let allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
}

module.exports.newListing = (req,res)=>{
    res.render("./listings/new.ejs");
}


module.exports.showListing = async(req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author",}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you have requested for , does not exist")
        return res.redirect("/listings")
    }
    console.log(listing);
    res.render("./listings/show.ejs",{listing});
}

module.exports.searchShowListing = async(req,res)=>{
    const {city} = req.body;
    const searchCity = city.toUpperCase().trim();
    const searchResults = await Listing.find({city:searchCity});
    res.render("listings/searchShow.ejs",{searchResults, searchCity});
}

module.exports.editListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you have requested for , does not exist !")
        return res.redirect("/listings")
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250")
    console.log(originalImageUrl);
    res.render("./listings/edit.ejs",{listing , originalImageUrl});
    // console.log(newListing);
}

module.exports.addListing = async (req, res, next) => {
    console.log("add listing route got hit")
    let url = req.file.path;
    let filename = req.file.filename;
    // request body already validated by validateListing middleware
    const newListing = new Listing(req.body.listing);

    // City formatting will be handled by the pre-save hook in the model
    
    const location = newListing.adress;

    const geoResponse = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params:{
                q:location,
                format:"json",
            },
            headers:{
                "User-Agent":"ParkSpotApp"
            }
        }
    );

    const geoData = geoResponse.data[0];

    newListing.latitude = geoData.lat;
    newListing.longitude = geoData.lon;

    newListing.owner = req.user._id;
    newListing.image = { url , filename};

    await newListing.save();

    req.flash("success","Listing added successfully !");
    res.redirect("/listings");
}

module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;

        listing.image = { url , filename};
        await listing.save();
    }
    req.flash("success","Listing updated successfully !");
    res.redirect(`/listings/${id}`)
}

module.exports.deleteListing = async(req,res)=>{
    const {id} = req.params;
    let deletedListing = await Listing.findOneAndDelete({_id:id});
    req.flash("success","Listing deleted successfully !");
    console.log(deletedListing);
    res.redirect("/listings");
}
