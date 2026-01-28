import React, { useState } from 'react';
import ForSaleHero from './ForSaleHero';
import ForSaleCategories from './ForSaleCategories';
import ForSaleCollections from './ForSaleCollections';
import ForSaleTrending from './ForSaleTrending';
import ForSaleBestDeals from './ForSaleBestDeals';

export default function ForSaleMarketplace() {
 

  return (
    <div className=" bg-gray-50">
      <ForSaleHero />
      <ForSaleCategories />
      <ForSaleCollections />
      <ForSaleTrending  />
      <ForSaleBestDeals  />
    </div>
  );
}