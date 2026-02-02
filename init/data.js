const sampleData = [
  {
    title: "City Bike Rental",
    description: "Affordable bike rental service for city travel and daily commute.",
    adress: "MG Road, Bengaluru",
    image: {
      filename:"listingImage",
      url:"https://images.unsplash.com/photo-1580145643545-1018ae4d2710?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    price: 300,
    vehicle_type: "Bike",
    country: "India"
  },
  {
    title: "Luxury Car for Wedding",
    description: "Premium sedan available for weddings and special occasions.",
    adress: "Andheri West, Mumbai",
    image:{
      filename:"listingImage",
      url:"https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    price: 8000,
    vehicle_type: "Car",
    country: "India"
  },
  {
    title: "SUV for Family Trips",
    description: "Spacious SUV suitable for long-distance family travel.",
    adress: "Sector 18, Noida",
    image:{
      filename:"listingimage",
      url:"https://images.unsplash.com/photo-1604275291560-55f54cec0e4d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    price: 6000,
    vehicle_type: "Car",
    country: "India"
  },
  {
    title: "Electric Scooter",
    description: "Eco-friendly electric scooter for short city rides.",
    adress: "Indiranagar, Bengaluru",
    image:{
      filename:"Listingimage",
      url:"https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    price: 250,
    vehicle_type: "Scooter",
    country: "India"
  },
  {
    title: "Mini Bus Rental",
    description: "Mini bus available for group travel, tours, and events.",
    adress: "Karol Bagh, Delhi",
    image:{
      filename:"listingimage",
      url:"https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    price: 12000,
    vehicle_type: "Bus",
    country: "India"
  },
  {
    title: "Pickup Truck for Transport",
    description: "Pickup truck suitable for transporting goods and equipment.",
    adress: "Industrial Area, Pune",
    image:{
      filename:"listingimage",
      url:"https://images.unsplash.com/photo-1616363088386-31c4a8414858?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    price: 5000,
    vehicle_type: "Truck",
    country: "India"
  },
  {
    title: "Self Drive Hatchback",
    description: "Compact hatchback ideal for self-drive city usage.",
    adress: "Salt Lake, Kolkata",
    image:{
      filename:"listingimage",
      url:"https://images.unsplash.com/photo-1635704764831-082c47202c6c?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    price: 2000,
    vehicle_type: "Car",
    country: "India"
  },
  {
    title: "Tempo Traveller",
    description: "Comfortable tempo traveller for group tours and outstation trips.",
    adress: "Gomti Nagar, Lucknow",
    image:{
      filename:'listingimage',
      url:"https://images.unsplash.com/photo-1580137331426-c28eb6be023b?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    price: 10000,
    vehicle_type: "Van",
    country: "India"
  },
  {
    title: "Royal Bike for Rent",
    description: "Premium bike available for long rides and road trips.",
    adress: "Civil Lines, Jaipur",
    image:{
      filename:"listingimage",
      url:"https://images.unsplash.com/photo-1619335680796-54f13b88c6ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    price: 700,
    vehicle_type: "Bike",
    country: "India"
  },
  {
    title: "Airport Taxi Service",
    description: "Reliable taxi service for airport pickup and drop.",
    adress: "Hitech City, Hyderabad",
    image:{
      filename:"listingimage",
      url:"https://images.unsplash.com/photo-1600542431895-dfe1c68eb1c5?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    price: 1500,
    vehicle_type: "Car",
    country: "India"
  }
];


module.exports = {data:sampleData};