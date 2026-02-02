const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./Review.js");
const { ref } = require("joi");
const User = require("./User.js");

const listingSchema = new Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    adress:{
        type:String,
    },
    image:{
        filename:{
            type:String,
            default:"ListingImage",
        },
        url:{
            type:String,
            default:"https://images.unsplash.com/photo-1580145643545-1018ae4d2710?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    },
    price:{
        type:Number,
    },
    vehicle_type:{
        type:String,
    },
    city:{
        type:String,
    },
    reviews:[{
        type: Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    latitude:Number,
    longitude:Number
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{ $in:listing.reviews }})
    }
})

// Ensure a default image URL is present when saving if none provided or empty
listingSchema.pre('save', function() {
    const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1635704764831-082c47202c6c?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    if (!this.image) {
        this.image = { filename: 'ListingImage', url: DEFAULT_IMAGE_URL };
    } else if (!this.image.url || String(this.image.url).trim() === '') {
        this.image.url = DEFAULT_IMAGE_URL;
        this.image.filename = this.image.filename || 'ListingImage';
    }
    
    // Format city: trim and convert to uppercase
    if (this.city) {
        this.city = this.city.trim().toUpperCase();
    }
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing; 
