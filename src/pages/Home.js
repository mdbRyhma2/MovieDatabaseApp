
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
        const listType = 'NowInTheatres';
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
          setEvents(eventDetails);
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
        style={{ ...style, display: "block", right: "10px" }}
        onClick={onClick}
      />
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: "10px", zIndex: "1" }}
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
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

    return (
        <div id="home-container">
          <h3>Upcoming Releases</h3>
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