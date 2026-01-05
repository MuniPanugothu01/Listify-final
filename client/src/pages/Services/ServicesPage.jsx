import React from 'react'
// import components
import HeroSection from '../../components/Services/HeroSection'
import MostBookedServices from '../../components/Services/MostBookedServices'
import AllServices from '../../components/Services/AllServices'
import ServiceHub from '../../components/Services/ServiceHub'
import ServiceCategories from '../../components/Services/ServiceCategories';
import SmartFilterBar from '../../components/Services/SmartFilterBar';
import HowItWorks from '../../components/Services/HowItWorks';
import ServiceTrustStrip from '../../components/Services/ServiceTrustStrip';
import PopularNearbyServices from '../../components/Services/PopularNearbyServices';
import TopRatedProfessionals from '../../components/Services/TopRatedProfessionals';
import PropertyExperts from '../../components/Services/PropertyExperts'

const ServicesPage = () => {
  return (
    <div>

        <HeroSection/>
      <MostBookedServices/>
      {/* <ServiceHub/> */}
      <ServiceCategories/>
      <HowItWorks/>
   <ServiceTrustStrip/>
<PopularNearbyServices/>
<TopRatedProfessionals/>
<PropertyExperts/>


    </div>
  )
}

export default ServicesPage;
