import React from 'react';
import HeroElectronics from './HeroElectronics.jsx';
import CollectionElectronics from './CollectionElectronics.jsx';
import ElectronicsRecommended from './ElectronicsRecommended.jsx';
import ElectronicsOffers from './ElectronicsOffers.jsx';
import ElectronicsTestimonials from './ElectronicsTestimonials.jsx';
import ElectronicsFAQSection from './ElectronicsFAQSection.jsx';

export default function Electronics() {
  return (
    <div className="">
      <HeroElectronics />
      <CollectionElectronics />
      <ElectronicsRecommended />
       <ElectronicsOffers />
      <ElectronicsTestimonials />
      <ElectronicsFAQSection />
    </div>
  );
}