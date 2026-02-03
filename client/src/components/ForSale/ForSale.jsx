import React, { useState } from 'react';
import ForSaleHero from './ForSaleHero';
import ForSaleCategories from './ForSaleCategories';
import ForSaleCollections from './ForSaleCollections';
import ForSaleTrending from './ForSaleTrending';
import ForSaleBestDeals from './ForSaleBestDeals';

import SampleForSale from './SampleForSale.jsx';

export default function ForSale() {
 

  return (
    <div className=" bg-gray-50">
      <ForSaleHero />
      <SampleForSale/>
      <ForSaleCategories />
      <ForSaleCollections />
      {/* <ForSaleTrending  /> */}
      {/* <ForSaleBestDeals  /> */}
    </div>
  );
}