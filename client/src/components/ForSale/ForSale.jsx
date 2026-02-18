import React from 'react';
import ForSaleHero from './ForSaleHero';
import ForSaleCategories from './ForSaleCategories';
import ForSaleCollections from './ForSaleCollections';
import ForSaleTrending from './ForSaleTrending';
import ForSaleBestDeals from './ForSaleBestDeals';

// import SampleForSale from './SampleForSale.jsx';
import SubNavbar from './SubNavbar.jsx';
import ForSaleListing from './ForSaleListing.jsx'; 

export default function ForSale() {
 

  return (
    <div className=" bg-gray-50">
      <SubNavbar/>
      <ForSaleHero />
      <ForSaleListing/>
      {/* <SampleForSale/> */}
      {/* <ForSaleCategories /> */}
      {/* <ForSaleCollections /> */}
      {/* <ForSaleTrending  /> */}
      {/* <ForSaleBestDeals  /> */}
    </div>
  );
}