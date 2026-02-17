

import React from 'react';
import EventsSubNav from '../../components/Events/EventsSubNav';
import EventsHero from '../../components/Events/EventsHero';
import Eventcard from '../../components/Events/Eventcard';
import EventsPopular from '../../components/Events/EventPopular'

import EventsListing from '../../components/Events/EventsListing';



const Events = () => {
    return (
        <div className="events-page">
            {/* <EventsSubNav /> */}
            <EventsHero />

            <EventsListing/>
           
             {/* <Eventcard /> */}

           {/* <EventsPopular /> */}

        </div>
    );
}
export default Events;
