const mongoose = require('mongoose');
const Listing = require('./models/listing');

async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/ParkSpot');
  const count = await Listing.countDocuments();
  const last = await Listing.findOne({}).sort({_id:-1}).lean();
  console.log('count:', count);
  console.log('last:', last);
  await mongoose.disconnect();
}

main().catch(err=>{
  console.error(err);
  process.exit(1);
});
