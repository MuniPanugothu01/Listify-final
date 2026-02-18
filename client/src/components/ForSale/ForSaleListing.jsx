import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForSaleListing = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');



 // ... (your existing products array here - keeping it as is)

  
const products = [
  // VEHICLES (4 items) - IDs 1-4
  { 
    id: 1, 
    title: '2007 Harley Davidson Softail', 
    price: 6500, 
    location: 'Bronxville, NY', 
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400', 
    promoted: false,
    condition: 'Good',
    seller: 'John D.',
    sellerRating: 4.5,
    sellerReviews: 128,
    sellerJoined: 'Jan 2020',
    description: 'Beautiful Harley Davidson Softail in excellent condition. Well maintained and regularly serviced. This classic cruiser features a powerful V-twin engine and comfortable riding position.',
    features: ['Clean title', 'Low mileage (12,000 miles)', 'New tires', 'Recent service', 'Garage kept'],
    category: 'Vehicles',
    subcategory: 'Motorcycles'
  },
  { 
    id: 2, 
    title: '2021 Ford Bronco Sport Badlands', 
    price: 16745, 
    location: 'Levittown, NY', 
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400', 
    promoted: false,
    condition: 'Excellent',
    seller: 'Ford Dealer',
    sellerRating: 4.9,
    sellerReviews: 512,
    sellerJoined: 'Jan 2015',
    description: '2021 Ford Bronco Sport Badlands in excellent condition. Low mileage and fully loaded with off-road package.',
    features: ['4WD', 'Leather seats', 'Sunroof', 'Backup camera', 'Bluetooth', 'Off-road package'],
    category: 'Vehicles',
    subcategory: 'Cars'
  },
  { 
    id: 3, 
    title: '2021 RAM 1500 Laramie', 
    price: 29242, 
    location: 'Valley Stream, NY', 
    image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=400', 
    promoted: false,
    condition: 'Excellent',
    seller: 'RAM Dealer',
    sellerRating: 4.8,
    sellerReviews: 389,
    sellerJoined: 'Mar 2016',
    description: '2021 RAM 1500 Laramie pickup truck. Powerful HEMI engine, great for work or play. Loaded with features.',
    features: ['HEMI V8', 'Crew cab', 'Navigation', 'Heated seats', 'Towing package', 'Spray-in bedliner'],
    category: 'Vehicles',
    subcategory: 'Trucks'
  },
  { 
    id: 4, 
    title: '2019 Yamaha YZF-R6 Sportbike', 
    price: 8999, 
    location: 'Staten Island, NY', 
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400', 
    promoted: true,
    condition: 'Like New',
    seller: 'Yamaha Dealer',
    sellerRating: 4.7,
    sellerReviews: 234,
    sellerJoined: 'Aug 2017',
    description: '2019 Yamaha YZF-R6 sportbike in pristine condition. 600cc engine, only 3,000 miles.',
    features: ['600cc engine', 'Quick shifter', 'Traction control', 'ABS brakes', 'Low miles'],
    category: 'Vehicles',
    subcategory: 'Motorcycles'
  },

  // ELECTRONICS (4 items) - IDs 5-8
  { 
    id: 5, 
    title: 'Samsung 65" Class 4K Smart TV', 
    price: 549, 
    location: 'Manhattan, NY', 
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', 
    promoted: false,
    condition: 'Like New',
    seller: 'Electronics Pro',
    sellerRating: 4.7,
    sellerReviews: 178,
    sellerJoined: 'Jul 2019',
    description: 'Samsung 65" 4K Smart TV. Crystal clear picture with smart features. Includes remote and original box.',
    features: ['4K resolution', 'Smart TV', 'HDR', 'Multiple HDMI ports', 'Wall mount included', 'Voice control'],
    category: 'Electronics',
    subcategory: 'TVs'
  },
  { 
    id: 6, 
    title: 'MacBook Pro 16" M1 Max', 
    price: 1899, 
    location: 'Brooklyn, NY', 
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', 
    promoted: true,
    condition: 'Like New',
    seller: 'Tech Seller',
    sellerRating: 4.9,
    sellerReviews: 245,
    sellerJoined: 'Feb 2020',
    description: 'MacBook Pro 16" with M1 Max chip. Blazing fast performance and all-day battery life. Like new condition.',
    features: ['M1 Max chip', '32GB RAM', '1TB SSD', 'Retina display', 'Touch ID', 'Studio quality mics'],
    category: 'Electronics',
    subcategory: 'Computers'
  },
  { 
    id: 7, 
    title: 'Sony PlayStation 5 Digital Edition', 
    price: 499, 
    location: 'Jersey City, NJ', 
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400', 
    promoted: false,
    condition: 'New',
    seller: 'Game Store',
    sellerRating: 4.8,
    sellerReviews: 167,
    sellerJoined: 'Aug 2018',
    description: 'Sony PlayStation 5 Digital Edition console. Brand new, never opened. Includes one DualSense controller.',
    features: ['Brand new', '825GB SSD', '4K gaming', 'Includes controller', 'Original box', 'Digital edition'],
    category: 'Electronics',
    subcategory: 'Gaming'
  },
  { 
    id: 8, 
    title: 'Canon EOS R6 Mirrorless Camera', 
    price: 2299, 
    location: 'Hoboken, NJ', 
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400', 
    promoted: false,
    condition: 'Excellent',
    seller: 'Camera Shop',
    sellerRating: 4.8,
    sellerReviews: 134,
    sellerJoined: 'Nov 2017',
    description: 'Canon EOS R6 mirrorless camera. Professional grade image quality. Includes kit lens and accessories.',
    features: ['20MP sensor', '4K video', 'Image stabilization', 'Dual card slots', 'WiFi', 'Weather sealed'],
    category: 'Electronics',
    subcategory: 'Cameras'
  },

  // HOME & GARDEN (4 items) - IDs 9-12
  { 
    id: 9, 
    title: 'Sectional Sofa with Chaise', 
    price: 850, 
    location: 'Newark, NJ', 
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', 
    promoted: false,
    condition: 'Like New',
    seller: 'Furniture Store',
    sellerRating: 4.6,
    sellerReviews: 98,
    sellerJoined: 'Apr 2019',
    description: 'Large sectional sofa with chaise in like-new condition. Very comfortable and spacious. Smoke-free home.',
    features: ['Stain resistant', 'Removable covers', 'Storage chaise', 'Cup holders', 'Free delivery', 'Gray color'],
    category: 'Home & Garden',
    subcategory: 'Furniture'
  },
  { 
    id: 10, 
    title: 'KitchenAid Professional Stand Mixer', 
    price: 279, 
    location: 'Yonkers, NY', 
    image: 'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=400', 
    promoted: false,
    condition: 'Good',
    seller: 'Kitchen Store',
    sellerRating: 4.7,
    sellerReviews: 156,
    sellerJoined: 'Oct 2018',
    description: 'KitchenAid professional stand mixer in good condition. Perfect for baking enthusiasts. Includes multiple attachments.',
    features: ['5-quart bowl', '10 speeds', 'Includes attachments', 'Easy to clean', 'Powerful motor', 'Red color'],
    category: 'Home & Garden',
    subcategory: 'Kitchen'
  },
  { 
    id: 11, 
    title: 'Dyson V15 Detect Cordless Vacuum', 
    price: 549, 
    location: 'White Plains, NY', 
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400', 
    promoted: false,
    condition: 'Excellent',
    seller: 'Home Store',
    sellerRating: 4.8,
    sellerReviews: 203,
    sellerJoined: 'Jan 2018',
    description: 'Dyson V15 Detect cordless vacuum. Powerful suction with laser detection. Like new condition.',
    features: ['Cordless', 'HEPA filter', 'Multiple attachments', '60 min runtime', 'Laser dust detection', 'LCD screen'],
    category: 'Home & Garden',
    subcategory: 'Appliances'
  },
  { 
    id: 12, 
    title: 'Outdoor Patio Dining Set', 
    price: 399, 
    location: 'New Rochelle, NY', 
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400', 
    promoted: false,
    condition: 'Good',
    seller: 'Outdoor Living',
    sellerRating: 4.5,
    sellerReviews: 67,
    sellerJoined: 'May 2020',
    description: 'Complete outdoor patio dining set. Perfect for summer gatherings. Table with 6 chairs and umbrella.',
    features: ['Table with 6 chairs', 'Weather resistant', 'Umbrella included', 'Cushioned seats', 'Easy assembly', 'Brown'],
    category: 'Home & Garden',
    subcategory: 'Outdoor'
  },

  // CLOTHING (4 items) - IDs 13-16
  { 
    id: 13, 
    title: 'Nike Air Jordan 1 Retro High', 
    price: 175, 
    location: 'Long Island City, NY', 
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400', 
    promoted: false,
    condition: 'New',
    seller: 'Sneaker Shop',
    sellerRating: 4.9,
    sellerReviews: 312,
    sellerJoined: 'Mar 2017',
    description: 'Nike Air Jordan 1 Retro High sneakers. Brand new in box. Authentic and stylish. Size 10.',
    features: ['Authentic', 'Size 10', 'Original box', 'Limited edition', 'Free shipping', 'Chicago colorway'],
    category: 'Clothing',
    subcategory: "Men's Clothing"
  },
  { 
    id: 14, 
    title: 'Louis Vuitton Neverfull MM', 
    price: 1200, 
    location: 'Astoria, NY', 
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', 
    promoted: true,
    condition: 'Excellent',
    seller: 'Luxury Goods',
    sellerRating: 4.8,
    sellerReviews: 189,
    sellerJoined: 'Jul 2018',
    description: 'Authentic Louis Vuitton Neverfull MM handbag in excellent condition. Gently used with dust bag.',
    features: ['Authentic', 'Monogram canvas', 'Gold hardware', 'Dust bag included', 'Certificate of authenticity', 'Pouch included'],
    category: 'Clothing',
    subcategory: "Women's Clothing"
  },
  { 
    id: 15, 
    title: 'The North Face Winter Jacket', 
    price: 89, 
    location: 'Flushing, NY', 
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 
    promoted: false,
    condition: 'Good',
    seller: 'Fashion Store',
    sellerRating: 4.6,
    sellerReviews: 78,
    sellerJoined: 'Sep 2019',
    description: 'Warm The North Face winter jacket. Perfect for cold weather. Size Large, black color.',
    features: ['Water resistant', 'Insulated', 'Multiple pockets', 'Adjustable hood', 'Machine washable', 'Size L'],
    category: 'Clothing',
    subcategory: "Men's Clothing"
  },
  { 
    id: 16, 
    title: 'Gucci GG Marmont Matelassé Bag', 
    price: 1850, 
    location: 'Manhattan, NY', 
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', 
    promoted: true,
    condition: 'Like New',
    seller: 'Luxury Goods',
    sellerRating: 4.9,
    sellerReviews: 278,
    sellerJoined: 'Feb 2017',
    description: 'Authentic Gucci GG Marmont bag. Minimal signs of wear, includes dust bag and authenticity card.',
    features: ['Authentic', 'Leather', 'Gold hardware', 'Dust bag included', 'Certificate of authenticity'],
    category: 'Clothing',
    subcategory: "Women's Clothing"
  },

  // BABY & KIDS (4 items) - IDs 17-20
  { 
    id: 17, 
    title: 'UPPAbaby Vista V2 Stroller', 
    price: 189, 
    location: 'Forest Hills, NY', 
    image: 'https://images.unsplash.com/photo-1544535009-88b170ca8935?w=400', 
    promoted: false,
    condition: 'Excellent',
    seller: 'Baby Store',
    sellerRating: 4.7,
    sellerReviews: 145,
    sellerJoined: 'Feb 2018',
    description: 'UPPAbaby Vista V2 stroller in excellent condition. Lightweight and easy to fold. Perfect for growing families.',
    features: ['Lightweight', 'One-hand fold', 'Large storage basket', 'Adjustable handle', 'Car seat compatible', 'Toddler seat included'],
    category: 'Baby & Kids',
    subcategory: 'Baby Gear'
  },
  { 
    id: 18, 
    title: 'Schwinn Kids Bike with Training Wheels', 
    price: 65, 
    location: 'Bayside, NY', 
    image: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=400', 
    promoted: false,
    condition: 'Good',
    seller: 'Bike Shop',
    sellerRating: 4.5,
    sellerReviews: 56,
    sellerJoined: 'Apr 2020',
    description: 'Schwinn kids bike with training wheels. Perfect for learning to ride. 16-inch wheels, pink color.',
    features: ['Training wheels', 'Adjustable seat', 'Basket included', 'Bell', 'Reflectors', '16-inch wheels'],
    category: 'Baby & Kids',
    subcategory: 'Toys'
  },
  { 
    id: 19, 
    title: 'Graco Pack Play Playard', 
    price: 85, 
    location: 'Queens, NY', 
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400', 
    promoted: false,
    condition: 'Good',
    seller: 'Baby Store',
    sellerRating: 4.6,
    sellerReviews: 98,
    sellerJoined: 'Mar 2019',
    description: 'Graco Pack and Play playard with bassinet and changing table. Lightly used, clean condition.',
    features: ['Portable', 'Bassinet included', 'Changing table', 'Storage pockets', 'Travel bag included'],
    category: 'Baby & Kids',
    subcategory: 'Nursery'
  },
  { 
    id: 20, 
    title: 'Britax Marathon Car Seat', 
    price: 120, 
    location: 'Brooklyn, NY', 
    image: 'https://images.unsplash.com/photo-1544535009-88b170ca8935?w=400', 
    promoted: true,
    condition: 'Good',
    seller: 'Mom2Mom',
    sellerRating: 4.8,
    sellerReviews: 167,
    sellerJoined: 'Jan 2019',
    description: 'Britax Marathon convertible car seat. Expires 2027, clean and well maintained.',
    features: ['Convertible', 'SafeCell technology', 'Machine washable cover', 'Expires 2027', 'LATCH system'],
    category: 'Baby & Kids',
    subcategory: 'Car Seats'
  },

  // TOYS & GAMES (4 items) - IDs 21-24
  { 
    id: 21, 
    title: 'LEGO Star Wars Millennium Falcon', 
    price: 85, 
    location: 'Scarsdale, NY', 
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', 
    promoted: false,
    condition: 'New',
    seller: 'Toy Store',
    sellerRating: 4.7,
    sellerReviews: 234,
    sellerJoined: 'May 2018',
    description: 'LEGO Star Wars Millennium Falcon set. Brand new in box, never opened.',
    features: ['1,351 pieces', 'Includes minifigures', 'Ages 9+', 'Collectible', 'Original box'],
    category: 'Toys & Games',
    subcategory: 'Action Figures'
  },
  { 
    id: 22, 
    title: 'Nintendo Switch OLED Model', 
    price: 299, 
    location: 'Jersey City, NJ', 
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400', 
    promoted: true,
    condition: 'Like New',
    seller: 'Game Store',
    sellerRating: 4.9,
    sellerReviews: 312,
    sellerJoined: 'Aug 2017',
    description: 'Nintendo Switch OLED model. Like new condition, includes all accessories and original box.',
    features: ['OLED screen', 'Joy-Con controllers', 'Dock included', 'Carry case', '64GB storage'],
    category: 'Toys & Games',
    subcategory: 'Video Games'
  },
  { 
    id: 23, 
    title: 'Catan Board Game', 
    price: 35, 
    location: 'Hoboken, NJ', 
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400', 
    promoted: false,
    condition: 'Good',
    seller: 'Board Game Shop',
    sellerRating: 4.6,
    sellerReviews: 145,
    sellerJoined: 'Oct 2019',
    description: 'Catan board game. Complete set, all pieces included. Great condition.',
    features: ['Complete set', 'All pieces included', '3-4 players', '60 min playtime', 'Strategy game'],
    category: 'Toys & Games',
    subcategory: 'Board Games'
  },
  { 
    id: 24, 
    title: 'Hot Wheels Track Set', 
    price: 45, 
    location: 'Queens, NY', 
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400', 
    promoted: false,
    condition: 'Good',
    seller: 'Toy Store',
    sellerRating: 4.5,
    sellerReviews: 89,
    sellerJoined: 'Nov 2020',
    description: 'Hot Wheels track set with loop and jump. Includes 2 cars. Great condition.',
    features: ['Loop and jump', 'Includes 2 cars', 'Easy assembly', 'Battery operated booster'],
    category: 'Toys & Games',
    subcategory: 'Die-cast Cars'
  },

  // SPORTS (4 items) - IDs 25-28
  { 
    id: 25, 
    title: 'Trek FX 3 Disc Hybrid Bike', 
    price: 425, 
    location: 'Mamaroneck, NY', 
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400', 
    promoted: false,
    condition: 'Good',
    seller: 'Bike Shop',
    sellerRating: 4.7,
    sellerReviews: 189,
    sellerJoined: 'Feb 2017',
    description: 'Trek FX 3 hybrid bike in good condition. Perfect for commuting and fitness riding.',
    features: ['21 speeds', 'Disc brakes', 'Lightweight frame', 'Recently tuned', 'Size M'],
    category: 'Sports',
    subcategory: 'Bikes'
  },
  { 
    id: 26, 
    title: 'Callaway Golf Club Set', 
    price: 349, 
    location: 'Larchmont, NY', 
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400', 
    promoted: false,
    condition: 'Good',
    seller: 'Golf Pro',
    sellerRating: 4.6,
    sellerReviews: 78,
    sellerJoined: 'Mar 2019',
    description: 'Complete Callaway golf club set. Great for beginners or intermediate players.',
    features: ['Driver', 'Irons 4-9', 'Putter', 'Stand bag included', 'Head covers'],
    category: 'Sports',
    subcategory: 'Golf'
  },
  { 
    id: 27, 
    title: 'Peloton Bike Original', 
    price: 650, 
    location: 'Harrison, NY', 
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400', 
    promoted: true,
    condition: 'Good',
    seller: 'Fitness Store',
    sellerRating: 4.8,
    sellerReviews: 234,
    sellerJoined: 'Jun 2018',
    description: 'Peloton original bike. Well maintained, includes shoes and weights.',
    features: ['Touchscreen', 'Includes shoes', '3 lb weights', 'Mat included', 'Monthly subscription required'],
    category: 'Sports',
    subcategory: 'Exercise'
  },
  { 
    id: 28, 
    title: 'Wilson Evolution Basketball', 
    price: 45, 
    location: 'Bronx, NY', 
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400', 
    promoted: false,
    condition: 'Like New',
    seller: 'Sports Store',
    sellerRating: 4.7,
    sellerReviews: 112,
    sellerJoined: 'Apr 2020',
    description: 'Wilson Evolution indoor/outdoor basketball. Official size, barely used.',
    features: ['Official size', 'Indoor/outdoor', 'Excellent grip', 'Composite leather'],
    category: 'Sports',
    subcategory: 'Basketball'
  },

  // COLLECTIBLES (4 items) - IDs 29-32
  { 
    id: 29, 
    title: 'Vintage Christmas Frame with Dogs', 
    price: 15, 
    location: 'Wayne, NJ', 
    image: 'https://images.unsplash.com/photo-1576699781638-76bbdc37f829?w=400', 
    promoted: false,
    condition: 'Used',
    seller: 'Sarah M.',
    sellerRating: 4.7,
    sellerReviews: 45,
    sellerJoined: 'Dec 2022',
    description: 'Vintage Christmas frame with cute dogs. Perfect for holiday decor. This unique piece features adorable dogs in a festive Christmas setting.',
    features: ['Vintage condition', 'Unique piece', 'Ready to hang', 'Perfect for collectors'],
    category: 'Collectibles',
    subcategory: 'Vintage'
  },
  { 
    id: 30, 
    title: 'Baseball Card Collection', 
    price: 175, 
    location: 'Pelham, NY', 
    image: 'https://images.unsplash.com/photo-1618693802507-6d6b78c5b070?w=400', 
    promoted: true,
    condition: 'Good',
    seller: 'Card Collector',
    sellerRating: 4.9,
    sellerReviews: 167,
    sellerJoined: 'Jan 2017',
    description: 'Collection of 50+ vintage baseball cards from 1980s-1990s. Includes rookie cards.',
    features: ['50+ cards', 'Includes rookie cards', 'Protective sleeves', 'Derek Jeter rookie'],
    category: 'Collectibles',
    subcategory: 'Sports Cards'
  },
  { 
    id: 31, 
    title: 'Vintage Vinyl Records Collection', 
    price: 45, 
    location: 'Harrison, NY', 
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400', 
    promoted: false,
    condition: 'Good',
    seller: 'Record Store',
    sellerRating: 4.8,
    sellerReviews: 145,
    sellerJoined: 'Oct 2017',
    description: 'Collection of 10 vintage vinyl records. Various artists from 1960s-1970s.',
    features: ['10 records', 'Various artists', 'Original sleeves', 'Beatles, Led Zeppelin'],
    category: 'Collectibles',
    subcategory: 'Vinyl Records'
  },
  { 
    id: 32, 
    title: 'Abstract Canvas Art', 
    price: 175, 
    location: 'Pelham, NY', 
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400', 
    promoted: true,
    condition: 'New',
    seller: 'Art Gallery',
    sellerRating: 4.9,
    sellerReviews: 89,
    sellerJoined: 'May 2018',
    description: 'Beautiful abstract canvas art. Original piece by local artist.',
    features: ['Original art', 'Ready to hang', 'Signed by artist', 'Certificate of authenticity', 'Modern design'],
    category: 'Collectibles',
    subcategory: 'Art'
  },

  // PETS (4 items) - IDs 33-36
  { 
    id: 33, 
    title: 'Large Dog Crate - Midwest Homes', 
    price: 79, 
    location: 'Bronxville, NY', 
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400', 
    promoted: false,
    condition: 'Good',
    seller: 'Pet Store',
    sellerRating: 4.7,
    sellerReviews: 112,
    sellerJoined: 'Jul 2018',
    description: 'Large Midwest Homes dog crate. Perfect for medium to large dogs up to 70 lbs.',
    features: ['Collapsible', 'Metal construction', 'Removable tray', 'Secure lock', 'Portable'],
    category: 'Pets',
    subcategory: 'Dog Supplies'
  },
  { 
    id: 34, 
    title: 'Cat Tree Tower with Scratching Posts', 
    price: 95, 
    location: 'Tuckahoe, NY', 
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400', 
    promoted: false,
    condition: 'Good',
    seller: 'Pet Store',
    sellerRating: 4.6,
    sellerReviews: 98,
    sellerJoined: 'Sep 2018',
    description: 'Multi-level cat tree tower with scratching posts. Your cat will love it!',
    features: ['Multiple levels', 'Scratching posts', 'Cozy perches', 'Sturdy base', 'Easy assembly'],
    category: 'Pets',
    subcategory: 'Cat Supplies'
  },
  { 
    id: 35, 
    title: 'Fluval Aquarium Kit - 20 Gallon', 
    price: 120, 
    location: 'New Rochelle, NY', 
    image: 'https://images.unsplash.com/photo-1575574644741-eead391cfe7c?w=400', 
    promoted: false,
    condition: 'Good',
    seller: 'Fish Store',
    sellerRating: 4.8,
    sellerReviews: 67,
    sellerJoined: 'Mar 2020',
    description: 'Fluval 20-gallon aquarium kit with filter and light. Great for beginners.',
    features: ['20 gallon', 'LED light', 'Filter included', 'Heater', 'Hood'],
    category: 'Pets',
    subcategory: 'Fish Supplies'
  },
  { 
    id: 36, 
    title: 'PetSafe Automatic Feeder', 
    price: 55, 
    location: 'Yonkers, NY', 
    image: 'https://images.unsplash.com/photo-1583336663277-620dc6cc4f85?w=400', 
    promoted: true,
    condition: 'Like New',
    seller: 'Pet Store',
    sellerRating: 4.7,
    sellerReviews: 134,
    sellerJoined: 'Nov 2019',
    description: 'PetSafe automatic pet feeder. Programmable for up to 4 meals per day.',
    features: ['Programmable', 'Holds 20 cups', 'Battery backup', 'Digital timer', 'Easy clean'],
    category: 'Pets',
    subcategory: 'Pet Supplies'
  },

  // BOOKS (4 items) - IDs 37-40
  { 
    id: 37, 
    title: 'The Great Gatsby - First Edition', 
    price: 125, 
    location: 'Scarsdale, NY', 
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400', 
    promoted: false,
    condition: 'Good',
    seller: 'Book Store',
    sellerRating: 4.8,
    sellerReviews: 156,
    sellerJoined: 'Aug 2018',
    description: 'First edition of The Great Gatsby by F. Scott Fitzgerald. Collectible condition.',
    features: ['First edition', 'Dust jacket', 'Collectible', '1925 printing'],
    category: 'Books',
    subcategory: 'Fiction'
  },
  { 
    id: 38, 
    title: 'Children\'s Book Collection - 20 Books', 
    price: 35, 
    location: 'Flushing, NY', 
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400', 
    promoted: false,
    condition: 'Good',
    seller: 'Sarah M.',
    sellerRating: 4.6,
    sellerReviews: 89,
    sellerJoined: 'Jan 2021',
    description: 'Collection of 20 children\'s books. Great for ages 2-6. Various titles.',
    features: ['20 books', 'Board books', 'Picture books', 'Dr. Seuss collection'],
    category: 'Books',
    subcategory: "Children's Books"
  },
  { 
    id: 39, 
    title: 'College Textbooks - Engineering Bundle', 
    price: 85, 
    location: 'Hoboken, NJ', 
    image: 'https://images.unsplash.com/photo-1497633762265-9d0c5d8bfe5b?w=400', 
    promoted: true,
    condition: 'Used',
    seller: 'College Student',
    sellerRating: 4.5,
    sellerReviews: 45,
    sellerJoined: 'Sep 2022',
    description: 'Bundle of 5 engineering textbooks. Calculus, Physics, Chemistry, etc.',
    features: ['5 textbooks', 'Calculus', 'Physics', 'Chemistry', 'Like new condition'],
    category: 'Books',
    subcategory: 'Textbooks'
  },
  { 
    id: 40, 
    title: 'Comic Book Collection - Marvel', 
    price: 65, 
    location: 'Queens, NY', 
    image: 'https://images.unsplash.com/photo-1588497859490-85d1c17db96d?w=400', 
    promoted: false,
    condition: 'Good',
    seller: 'Comic Shop',
    sellerRating: 4.9,
    sellerReviews: 234,
    sellerJoined: 'Mar 2017',
    description: 'Collection of 15 Marvel comic books. Includes Spider-Man, X-Men, Avengers.',
    features: ['15 comics', 'Marvel', 'Protective sleeves', 'Various issues'],
    category: 'Books',
    subcategory: 'Comics'
  },

  // BEAUTY (4 items) - IDs 41-44
  { 
    id: 41, 
    title: 'Dyson Airwrap Complete Set', 
    price: 450, 
    location: 'Manhattan, NY', 
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400', 
    promoted: true,
    condition: 'Like New',
    seller: 'Beauty Store',
    sellerRating: 4.8,
    sellerReviews: 267,
    sellerJoined: 'Feb 2018',
    description: 'Dyson Airwrap complete styler set. Like new condition, includes all attachments.',
    features: ['Complete set', 'All attachments', 'Original box', 'Gently used'],
    category: 'Beauty',
    subcategory: 'Hair Care'
  },
  { 
    id: 42, 
    title: 'Makeup Revolution Pro Palette', 
    price: 25, 
    location: 'Brooklyn, NY', 
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400', 
    promoted: false,
    condition: 'Like New',
    seller: 'Beauty Store',
    sellerRating: 4.6,
    sellerReviews: 98,
    sellerJoined: 'May 2020',
    description: 'Makeup Revolution Pro eyeshadow palette. 32 shades, barely used.',
    features: ['32 shades', 'Matte and shimmer', 'High pigment', 'Cruelty free'],
    category: 'Beauty',
    subcategory: 'Makeup'
  },
  { 
    id: 43, 
    title: 'Le Labo Santal 33 Perfume', 
    price: 185, 
    location: 'Astoria, NY', 
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400', 
    promoted: true,
    condition: 'Like New',
    seller: 'Luxury Goods',
    sellerRating: 4.9,
    sellerReviews: 189,
    sellerJoined: 'Jul 2019',
    description: 'Le Labo Santal 33 perfume. 100ml bottle, 90% full.',
    features: ['100ml', 'Unisex', '90% full', 'Original box'],
    category: 'Beauty',
    subcategory: 'Fragrance'
  },
  { 
    id: 44, 
    title: 'SkinCeuticals CE Ferulic Serum', 
    price: 120, 
    location: 'White Plains, NY', 
    image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400', 
    promoted: false,
    condition: 'New',
    seller: 'Skincare Shop',
    sellerRating: 4.8,
    sellerReviews: 145,
    sellerJoined: 'Oct 2019',
    description: 'SkinCeuticals CE Ferulic serum. Brand new, sealed in box.',
    features: ['Brand new', 'Sealed', 'Vitamin C', 'Anti-aging'],
    category: 'Beauty',
    subcategory: 'Skincare'
  }
];


  // Store all products in localStorage for similar items
  localStorage.setItem('allProducts', JSON.stringify(products));

  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Product Card Component
  const ProductCard = ({ image, title, price, location, promoted, product }) => {
    const handleCardClick = () => {
      // Store the product data in localStorage
      localStorage.setItem('selectedProduct', JSON.stringify(product));
      
      // Navigate to the forsale details page with id
      navigate(`/forsale/${product.id}`);
    };

    return (
      <div 
        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-48 object-cover"
          />
          {promoted && (
            <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              Promoted
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="text-sm font-semibold text-gray-900 truncate mb-1">
            {title}
          </h3>
          <p className="text-lg font-bold text-gray-900 mb-1">
            ${price.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            {location}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">      
      {/* Products Grid */}
      <div className="px-12 py-4 sm:px-8 md:px-8 lg:px-12 xl:px-12">
        {/* Header with title and search bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            For Sale
          </h1>
          
          {/* Search Bar */}
          <div className="w-full sm:w-96">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Cars,Electronics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg 
                  className="w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <svg 
                    className="w-5 h-5 text-gray-400 hover:text-gray-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 mb-4">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} 
              product={product}
            />
          ))}
        </div>

        {/* No results message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForSaleListing;