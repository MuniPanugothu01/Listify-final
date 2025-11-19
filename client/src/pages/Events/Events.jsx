

import React from 'react';
import EventsSubNav from '../../components/Events/EventsSubNav';
import EventsHero from '../../components/Events/EventsHero';
import Eventcard from '../../components/Events/Eventcard';


const Events = () => {
    return (
        <div className="events-page">
            <EventsSubNav />
            <EventsHero />
            <Eventcard />
        </div>
    );
}
export default Events;
