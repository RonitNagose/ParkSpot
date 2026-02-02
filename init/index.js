const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");

main()
.then((res)=>{
    console.log("Connected to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ParkSpot');
};

const initDb = async()=>{
    await listing.deleteMany({});
    // initData.data = initData.data.map((obj)=>({...obj , owner : '69724d81d5c231c0d2c170ea'}))
    // await listing.insertMany(initData.data);
    // console.log("Data is Initialized");
}

initDb();

