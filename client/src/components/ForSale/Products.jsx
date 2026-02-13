import React from 'react';

const Products = () => {
  // Product Card Component
  const ProductCard = ({ image, title, price, location, promoted }) => {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
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
      promoted: false 
    },
    { 
      id: 2, 
      title: 'BMW 35 W HID Light Kit', 
      price: 200, 
      location: 'Queens, NY', 
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400', 
      promoted: true 
    },
    { 
      id: 3, 
      title: '2007 Harley Davidson', 
      price: 6500, 
      location: 'The Bronx, NY', 
      image: 'https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=400', 
      promoted: false 
    },
    { 
      id: 4, 
      title: 'Christmas Dogs & Vintage Frame', 
      price: 15, 
      location: 'Wayne, NJ', 
      image: 'https://images.unsplash.com/photo-1576699781638-76bbdc37f829?w=400', 
      promoted: false 
    },
    { 
      id: 5, 
      title: '2013 Harley-Davidson Street', 
      price: 4999, 
      location: 'Staten Island, NY', 
      image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400', 
      promoted: false 
    },
    { 
      id: 6, 
      title: '2021 Ford Bronco Sport', 
      price: 16745, 
      location: 'Levittown, NY', 
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400', 
      promoted: false 
    },
    { 
      id: 7, 
      title: '2021 RAM 1500', 
      price: 29242, 
      location: 'Valley Stream, NY', 
      image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?w=400', 
      promoted: false 
    },
    { 
      id: 8, 
      title: 'Samsung 65" 4K Smart TV', 
      price: 549, 
      location: 'Manhattan, NY', 
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', 
      promoted: false 
    },
    { 
      id: 9, 
      title: 'MacBook Pro 16" M1', 
      price: 1899, 
      location: 'Brooklyn, NY', 
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', 
      promoted: true 
    },
    { 
      id: 10, 
      title: 'Sony PlayStation 5', 
      price: 499, 
      location: 'Jersey City, NJ', 
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400', 
      promoted: false 
    },
    { 
      id: 11, 
      title: 'Canon EOS R6 Camera', 
      price: 2299, 
      location: 'Hoboken, NJ', 
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400', 
      promoted: false 
    },
    { 
      id: 12, 
      title: 'Sectional Sofa - Like New', 
      price: 850, 
      location: 'Newark, NJ', 
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', 
      promoted: false 
    },
    { 
      id: 13, 
      title: 'KitchenAid Stand Mixer', 
      price: 279, 
      location: 'Yonkers, NY', 
      image: 'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=400', 
      promoted: false 
    },
    { 
      id: 14, 
      title: 'Dyson V15 Vacuum', 
      price: 549, 
      location: 'White Plains, NY', 
      image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400', 
      promoted: false 
    },
    { 
      id: 15, 
      title: 'Outdoor Patio Set', 
      price: 399, 
      location: 'New Rochelle, NY', 
      image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400', 
      promoted: false 
    },
    { 
      id: 16, 
      title: 'Nike Air Jordan 1', 
      price: 175, 
      location: 'Long Island City, NY', 
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400', 
      promoted: false 
    },
    { 
      id: 17, 
      title: 'Designer Handbag', 
      price: 320, 
      location: 'Astoria, NY', 
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', 
      promoted: true 
    },
    { 
      id: 18, 
      title: 'Men\'s Winter Jacket', 
      price: 89, 
      location: 'Flushing, NY', 
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 
      promoted: false 
    },
    { 
      id: 19, 
      title: 'Baby Stroller - Excellent', 
      price: 189, 
      location: 'Forest Hills, NY', 
      image: 'https://images.unsplash.com/photo-1544535009-88b170ca8935?w=400', 
      promoted: false 
    },
    { 
      id: 20, 
      title: 'Kids Bike with Training Wheels', 
      price: 65, 
      location: 'Bayside, NY', 
      image: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=400', 
      promoted: false 
    },
    { 
      id: 21, 
      title: 'Toyota Camry 2020', 
      price: 18900, 
      location: 'Port Chester, NY', 
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400', 
      promoted: false 
    },
    { 
      id: 22, 
      title: 'Honda Civic 2019', 
      price: 16500, 
      location: 'Mount Vernon, NY', 
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400', 
      promoted: false 
    },
    { 
      id: 23, 
      title: 'LEGO Star Wars Set', 
      price: 129, 
      location: 'Scarsdale, NY', 
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', 
      promoted: false 
    },
    { 
      id: 24, 
      title: 'Vintage Guitar - Fender', 
      price: 899, 
      location: 'Rye, NY', 
      image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=400', 
      promoted: false 
    },
    { 
      id: 25, 
      title: 'Mountain Bike - Trek', 
      price: 425, 
      location: 'Mamaroneck, NY', 
      image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400', 
      promoted: false 
    },
    { 
      id: 26, 
      title: 'Golf Club Set', 
      price: 349, 
      location: 'Larchmont, NY', 
      image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400', 
      promoted: false 
    },
    { 
      id: 27, 
      title: 'Vintage Vinyl Records', 
      price: 45, 
      location: 'Harrison, NY', 
      image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400', 
      promoted: false 
    },
    { 
      id: 28, 
      title: 'Abstract Canvas Art', 
      price: 175, 
      location: 'Pelham, NY', 
      image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400', 
      promoted: true 
    },
    { 
      id: 29, 
      title: 'Dog Crate - Large', 
      price: 79, 
      location: 'Bronxville, NY', 
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400', 
      promoted: false 
    },
    { 
      id: 30, 
      title: 'Cat Tree Tower', 
      price: 95, 
      location: 'Tuckahoe, NY', 
      image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400', 
      promoted: false 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">      
      {/* Products Grid */}
      <div className=" px-12 py-4 sm:px-8 md:px-8 lg:px-12 xl:px-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          For Sale
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;