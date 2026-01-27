import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function CollectionForSale() {
  const collections = [
    {
      category: 'Home & Living',
      items: [
        { name: 'Modern Sofa Set', price: '$1,299.00', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' },
        { name: 'Smart Coffee Table', price: '$399.00', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
        { name: 'Leather Recliner', price: '$999.00', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-yellow-600', 'bg-gray-800', 'bg-brown-700']
    },
    {
      category: 'Kitchen Essentials',
      items: [
        { name: 'Stainless Steel Cookware', price: '$299.00', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
        { name: 'Smart Coffee Maker', price: '$249.00', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop' },
        { name: 'Premium Blender Set', price: '$199.00', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-silver-400', 'bg-red-500', 'bg-gray-300']
    },
    {
      category: 'Fashion & Apparel',
      items: [
        { name: 'Premium Denim Jacket', price: '$89.00', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop' },
        { name: 'Designer Sneakers', price: '$149.00', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop' },
        { name: 'Leather Handbag', price: '$229.00', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-blue-600', 'bg-black', 'bg-brown-900']
    },
    {
      category: 'Health & Fitness',
      items: [
        { name: 'Smart Fitness Watch', price: '$199.00', image: 'https://images.unsplash.com/photo-1579586337278-3f576cfc5113?w=400&h=300&fit=crop' },
        { name: 'Adjustable Dumbbells', price: '$129.00', image: 'https://images.unsplash.com/photo-1534367507877-0edd93bd013b?w=400&h=300&fit=crop' },
        { name: 'Yoga Mat Premium', price: '$49.00', image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-green-600', 'bg-black', 'bg-blue-700']
    },
    {
      category: 'Outdoor & Garden',
      items: [
        { name: 'Patio Furniture Set', price: '$599.00', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
        { name: 'Smart Garden Tools', price: '$199.00', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop' },
        { name: 'Outdoor Grill Station', price: '$449.00', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-green-800', 'bg-gray-600', 'bg-red-700']
    },
    {
      category: 'Beauty & Personal Care',
      items: [
        { name: 'Professional Hair Dryer', price: '$89.00', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop' },
        { name: 'Skincare Bundle', price: '$129.00', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop' },
        { name: 'Electric Toothbrush', price: '$79.00', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop' },
      ],
      colors: ['bg-pink-500', 'bg-purple-600', 'bg-teal-400']
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Shop By Category
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore diverse collections across all categories, from home essentials to personal care and everything in between.
        </p>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {collections.map((collection, idx) => (
          <div key={idx} className="space-y-6">
            {/* Category Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{collection.category}</h3>
              <div className="flex gap-1.5">
                {collection.colors.map((color, colorIdx) => (
                  <div key={colorIdx} className={`w-4 h-4 rounded-full ${color}`} />
                ))}
              </div>
            </div>

            {/* Product Card */}
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="relative aspect-[4/3] bg-gray-100">
                <img
                  src={collection.items[0].image}
                  alt={collection.items[0].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    {collection.items[0].name}
                  </h4>
                  <p className="text-lg font-semibold text-gray-900">
                    {collection.items[0].price}
                  </p>
                </div>
                <button className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors">
                  <ShoppingBag className="w-5 h-5 text-blue-700" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="text-center">
        <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-600 hover:text-white transition-colors">
          View All Categories
        </button>
      </div>
    </div>
  );
}