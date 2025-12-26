import React from 'react'
// import components
import HeroSection from '../../components/Services/HeroSection'
import MostBookedServices from '../../components/Services/MostBookedServices'
import AllServices from '../../components/Services/AllServices'
import ServiceHub from '../../components/Services/ServiceHub'
const ServicesPage = () => {
  return (
    <div>

        <HeroSection/>
      <MostBookedServices/>
      <ServiceHub/>
    </div>
  )
}

export default ServicesPage;
