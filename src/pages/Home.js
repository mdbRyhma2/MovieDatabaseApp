import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Slider from 'react-slick';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const listType = 'ComingSoon';
        const area = 'ALL';
        const includeVideos = 'true';
        const includeLinks = 'false';
        const includeGallery = 'false';
        const includePictures = 'false';

        const url = `https://www.finnkino.fi/xml/Events?listType=${listType}&area=${area}&includeVideos=${includeVideos}&includeLinks=${includeLinks}&includeGallery=${includeGallery}&includePictures=${includePictures}`;

        const response = await axios.get(url);

        if (response.status === 200) {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(response.data, "text/xml");

          const events = xmlDoc.getElementsByTagName('Event');
          console.log("Raw events: ", events);

          const eventDetails = [];
          for (let i = 0; i < events.length; i++) {
            eventDetails.push({
              "title": events[i].getElementsByTagName('Title')[0].textContent,
              "releaseDate": events[i].getElementsByTagName('dtLocalRelease')[0].textContent,
              "image": events[i].getElementsByTagName('EventMediumImagePortrait')[0].textContent,
            })
            /*
            const event = events[i];
            const title = event.getElementsByTagName('Title')[0]?.textContent;
            const releaseDate = event.getElementsByTagName('dtLocalRelease')[0]?.textContent;

            eventDetails.push({
              title,
              releaseDate,
            });*/
          }
          console.log("Parsed event details: ", eventDetails)

         // Filter and sort the events
      const upcomingEvents = eventDetails
        .filter(event => {
          const isUpcoming = new Date(event.releaseDate) > new Date();
          console.log(`Event: ${event.title}, Release Date: ${event.releaseDate}, Is Upcoming: ${isUpcoming}`);
          return isUpcoming;
        })
        .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)); // Sort events by ascending release date

      console.log("Filtered and sorted events:", upcomingEvents); 
              setEvents(upcomingEvents);
        }
      } catch (error) {
        setError('Error fetching event data');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [])
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", right: "5px" }}
        onClick={onClick}
      />
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: "5px", zIndex: "1" }}
        onClick={onClick}
      />
    );
  };
  const sliderSettings = {
    dots: false, // Add navigation dots
    infinite: true, // Infinite scrolling
    speed: 500, // Transition speed
    slidesToShow: 6, // Number of visible slides
    slidesToScroll: 4, // Slides to scroll per action
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      // Responsivity for tablet, and two types of phones
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

    return (
        <div id="home-container">
          <h3>Soon in theatres</h3>
          <Slider {...sliderSettings}>
            {events.length > 0 ? (
              events.map((event, index) => (
                <div key={index} className='event-card'>
                  {event.image && (
                    <img
                    src={event.image}
                    alt={event.title}
                    className='event-image'
                    />
                  )}
                  <h6>{event.title}</h6>
                  <p>Release Date: {new Date(event.releaseDate).toLocaleString()}</p>
                </div>
              ))
            ): (
              <p>No events available</p>
            )}
          </Slider>
        </div>
      )
    }