const mongoose = require('mongoose');
const Listing = require('./models/listing');

async function run(){
  await mongoose.connect('mongodb://127.0.0.1:27017/ParkSpot');
  const res = await Listing.deleteMany({ title: 'preSaveTest' });
  console.log('delete result:', res);
  const remaining = await Listing.find({ title: 'preSaveTest' }).lean();
  console.log('remaining matches:', remaining.length);
  await mongoose.disconnect();
}

run().catch(e=>{console.error(e); process.exit(1)});
