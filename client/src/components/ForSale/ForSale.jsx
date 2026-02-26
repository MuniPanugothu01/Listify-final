import React from 'react';
import ForSaleHero from './ForSaleHero';
import SubNavbar from './ForSaleSubNavbar.jsx';
import ForSaleListing from './ForSaleListing.jsx'; 

export default function ForSale() {
 

  return (
    <div className="">
      <ForSaleSubNavbar/>
      <ForSaleHero />
      <ForSaleListing/>
   
    </div>
  );
}