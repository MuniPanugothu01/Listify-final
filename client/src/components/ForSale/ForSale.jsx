import React from 'react';
import ForSaleHero from './ForSaleHero';


// import SampleForSale from './SampleForSale.jsx';
import SubNavbar from './ForSaleSubNavbar.jsx';
import ForSaleListing from './ForSaleListing.jsx'; 

export default function ForSale() {
 

  return (
    <div className="">
      <SubNavbar/>
      <ForSaleHero />
      <ForSaleListing/>
   
    </div>
  );
}