import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForSaleListing = () => {
  const navigate = useNavigate();

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

const products = [
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
    features: ['Clean title', 'Low mileage (12,000 miles)', 'New tires', 'Recent service', 'Garage kept']
  },
  { 
    id: 2, 
    title: 'BMW 35W HID Light Kit', 
    price: 200, 
    location: 'Queens, NY', 
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400', 
    promoted: true,
    condition: 'Like New',
    seller: 'Auto Parts Pro',
    sellerRating: 4.8,
    sellerReviews: 256,
    sellerJoined: 'Mar 2019',
    description: 'High-quality BMW HID light kit. Perfect condition, barely used. This kit includes everything you need for installation and will significantly improve your nighttime visibility.',
    features: ['Complete kit', 'Easy installation', '1 year warranty', 'Professional grade', 'Plug and play']
  },
  { 
    id: 3, 
    title: '2007 Harley Davidson Sportster', 
    price: 5500, 
    location: 'The Bronx, NY', 
    image: 'https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=400', 
    promoted: false,
    condition: 'Good',
    seller: 'Mike R.',
    sellerRating: 4.3,
    sellerReviews: 89,
    sellerJoined: 'Aug 2021',
    description: 'Classic Harley Davidson Sportster motorcycle. Runs great, ready to ride. This bike has been well maintained and is in excellent mechanical condition.',
    features: ['Garage kept', 'New battery', 'Clean title', 'Service records', 'New brake pads']
  },
  { 
    id: 4, 
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
    features: ['Vintage condition', 'Unique piece', 'Ready to hang', 'Perfect for collectors']
  },
  { 
    id: 5, 
    title: '2013 Harley-Davidson Street 750', 
    price: 4999, 
    location: 'Staten Island, NY', 
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400', 
    promoted: false,
    condition: 'Very Good',
    seller: 'Tom W.',
    sellerRating: 4.6,
    sellerReviews: 167,
    sellerJoined: 'Feb 2018',
    description: '2013 Harley-Davidson Street 750 motorcycle. Well maintained and ready to ride. Great entry-level Harley with plenty of power and style.',
    features: ['Low miles (8,500 miles)', 'Garage kept', 'New tires', 'Recent service', 'Aftermarket exhaust']
  },
  { 
    id: 6, 
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
    features: ['4WD', 'Leather seats', 'Sunroof', 'Backup camera', 'Bluetooth', 'Off-road package']
  },
  { 
    id: 7, 
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
    features: ['HEMI V8', 'Crew cab', 'Navigation', 'Heated seats', 'Towing package', 'Spray-in bedliner']
  },
  { 
    id: 8, 
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
    features: ['4K resolution', 'Smart TV', 'HDR', 'Multiple HDMI ports', 'Wall mount included', 'Voice control']
  },
  { 
    id: 9, 
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
    features: ['M1 Max chip', '32GB RAM', '1TB SSD', 'Retina display', 'Touch ID', 'Studio quality mics']
  },
  { 
    id: 10, 
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
    features: ['Brand new', '825GB SSD', '4K gaming', 'Includes controller', 'Original box', 'Digital edition']
  },
  { 
    id: 11, 
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
    features: ['20MP sensor', '4K video', 'Image stabilization', 'Dual card slots', 'WiFi', 'Weather sealed']
  },
  { 
    id: 12, 
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
    features: ['Stain resistant', 'Removable covers', 'Storage chaise', 'Cup holders', 'Free delivery', 'Gray color']
  },
  { 
    id: 13, 
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
    features: ['5-quart bowl', '10 speeds', 'Includes attachments', 'Easy to clean', 'Powerful motor', 'Red color']
  },
  { 
    id: 14, 
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
    features: ['Cordless', 'HEPA filter', 'Multiple attachments', '60 min runtime', 'Laser dust detection', 'LCD screen']
  },
  { 
    id: 15, 
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
    features: ['Table with 6 chairs', 'Weather resistant', 'Umbrella included', 'Cushioned seats', 'Easy assembly', 'Brown']
  },
  { 
    id: 16, 
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
    features: ['Authentic', 'Size 10', 'Original box', 'Limited edition', 'Free shipping', 'Chicago colorway']
  },
  { 
    id: 17, 
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
    features: ['Authentic', 'Monogram canvas', 'Gold hardware', 'Dust bag included', 'Certificate of authenticity', 'Pouch included']
  },
  { 
    id: 18, 
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
    features: ['Water resistant', 'Insulated', 'Multiple pockets', 'Adjustable hood', 'Machine washable', 'Size L']
  },
  { 
    id: 19, 
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
    features: ['Lightweight', 'One-hand fold', 'Large storage basket', 'Adjustable handle', 'Car seat compatible', 'Toddler seat included']
  },
  { 
    id: 20, 
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
    features: ['Training wheels', 'Adjustable seat', 'Basket included', 'Bell', 'Reflectors', '16-inch wheels']
  }
];


// Store all products in localStorage for similar items
localStorage.setItem('allProducts', JSON.stringify(products));



  return (
    <div className="min-h-screen bg-gray-50">      
      {/* Products Grid */}
      <div className="px-12 py-4 sm:px-8 md:px-8 lg:px-12 xl:px-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          For Sale
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} 
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForSaleListing;