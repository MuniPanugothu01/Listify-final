

import React from 'react';
import EventsSubNav from '../../components/Events/EventsSubNav';
import EventsHero from '../../components/Events/EventsHero';
import Eventcard from '../../components/Events/Eventcard';
import EventsPopular from '../../components/Events/EventPopular'

import EventSample from '../../components/Events/EventSample';



const Events = () => {
    return (
        <div className="events-page">
            {/* <EventsSubNav /> */}
            <EventsHero />

            <EventSample/>
           
             {/* <Eventcard /> */}

           {/* <EventsPopular /> */}

        </div>
    );
}
export default Events;
