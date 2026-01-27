import React from 'react';
import HeroForSale from './HeroForsale.jsx';
import CollectionForSale from './CollectionForSale';
import ForSaleRecommended from './ForSaleRecommend.jsx';
import ForSaleOffers from './ForSaleOffers.jsx';
import ForSaleTestimonials from './ForSaleTestimonials.jsx';
import ForSaleFAQSection from './ForSaleFAQSection.jsx';

export default function ForSale() {
  return (
    <div className="">
      <HeroForSale />
      <CollectionForSale />
      <ForSaleRecommended />
       <ForSaleOffers />
      <ForSaleTestimonials />
      <ForSaleFAQSection />
    </div>
  );
}