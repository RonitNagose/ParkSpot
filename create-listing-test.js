const mongoose = require('mongoose');
const Listing = require('./models/listing');

async function run(){
  await mongoose.connect('mongodb://127.0.0.1:27017/ParkSpot');
  let l = new Listing({
    title: 'preSaveTest',
    description: 'testing pre save default image',
    adress: 'somewhere',
    image: { url: '' },
    price: 10,
    vehicle_type: 'Car',
    country: 'India'
  });
  await l.save();
  console.log('saved:', l);
  const last = await Listing.findOne({ title: 'preSaveTest' }).lean();
  console.log('fetched last:', last);
  await mongoose.disconnect();
}

run().catch(e=>{console.error(e); process.exit(1) });
