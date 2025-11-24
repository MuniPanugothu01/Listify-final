

import React from 'react';
import EventsSubNav from '../../components/Events/EventsSubNav';
import EventsHero from '../../components/Events/EventsHero';
import Eventcard from '../../components/Events/Eventcard';
import EventDetails from '../../components/Events/EventDetails';


const Events = () => {
    return (
        <div className="events-page">
            <EventsSubNav />
            <EventsHero />
           <div className='pt-30'>
             <Eventcard />
           </div>
           {/* <EventDetails/> */}
            {/* <Eventcard /> */}
        </div>
    );
}
export default Events;
