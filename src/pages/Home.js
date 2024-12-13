/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Slider from 'react-slick';
import { fetchAllMovieReviews } from '../api/api';

const url = "http://localhost:3001";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

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
          //console.log("Raw events: ", events);

          const eventDetails = [];
          for (let i = 0; i < events.length; i++) {
            eventDetails.push({
              "title": events[i].getElementsByTagName('Title')[0].textContent,
              "releaseDate": events[i].getElementsByTagName('dtLocalRelease')[0].textContent,
              "image": events[i].getElementsByTagName('EventMediumImagePortrait')[0].textContent,
            })
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

    // Fetch Reviews
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_API_URL}/reviews/`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    fetchEvents();
    fetchReviews
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

  /*
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_API_URL}/reviews/`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      setReviews(response.data);
      console.log(reviews);
    } catch (error) {
      console.error(error)
      console.log("error")
    }
  }

    return (
        <div id="home-container">
          <div>
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
          <div>
            <h3>Latest Reviews</h3>
            <Slider {...sliderSettings}>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className='review-card'>
                    <h6>Movie: {review.movie_title}</h6>
                    <p>
                      <strong>Reviewer:</strong> {review.email}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(review.created_at).toLocaleString()}
                    </p>
                    <p>
                      <strong>Grade:</strong> {review.grade}
                    </p>
                    <p>
                      <strong>Review:</strong> {review.review}
                    </p>
                  </div>
                ))
              ) : (
                <p>No reviews available</p>
              )}
            </Slider>
          </div>
        </div>
      )
    }
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Slider from 'react-slick';
import { Link } from 'react-router-dom'

//const url = "http://localhost:3001"; // Make sure this points to your backend server

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

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

          const eventDetails = [];
          for (let i = 0; i < events.length; i++) {
            eventDetails.push({
              "title": events[i].getElementsByTagName('Title')[0].textContent,
              "releaseDate": events[i].getElementsByTagName('dtLocalRelease')[0].textContent,
              "image": events[i].getElementsByTagName('EventMediumImagePortrait')[0].textContent,
            });
          }

          // Filter and sort the events to get upcoming events
          const upcomingEvents = eventDetails
            .filter(event => new Date(event.releaseDate) > new Date())
            .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));

          setEvents(upcomingEvents);
        }
      } catch (error) {
        setError('Error fetching event data');
      } finally {
        setLoading(false);
      }
    };

    // Fetch Reviews
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/`);

        // Filter out duplicates based on 'movie_id' or any unique field
        const uniqueReviews = response.data.filter((review, index, self) => 
          index === self.findIndex((r) => (
            r.movie_id === review.movie_id // Adjust this if necessary based on how the reviews are structured
          ))
        );

        setReviews(uniqueReviews);
        console.log(uniqueReviews)
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    fetchEvents();
    fetchReviews(); // Fetch reviews as well

  }, []); // Empty dependency array to run only once after the component mounts

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className=""
        style={{ ...style, display: "block", right: "5px" }}
        onClick={onClick}
      />
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className=""
        style={{ ...style, display: "block", left: "5px", zIndex: "1" }}
        onClick={onClick}
      />
    );
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
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
      <div>
        <h3>Soon in theatres</h3>
        <Slider {...sliderSettings}>
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={index} className="event-card">
                {event.image && (
                  <img src={event.image} alt={event.title} className="event-image" />
                )}
                <h6>{event.title}</h6>
                <p>Release Date: {new Date(event.releaseDate).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>No events available</p>
          )}
        </Slider>
      </div>

      <div>
        <h3 className='review-title'>Latest Reviews</h3>
        <Slider {...sliderSettings}>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-card">
                <h6>
                  {/*Make movie title a clickable link*/}
                  <Link to={`/movie/${review.movie_id}`} className='review-movie-link'>
                      {review.movie_title}
                  </Link>
                </h6>
                <p>
                  <strong>Reviewer:</strong><br/> {review.email}
                </p>
                <p>
                  <strong>Date:</strong><br/> {new Date(review.created_at).toLocaleString()}
                </p>
                <p>
                  <strong>Grade:</strong> {review.grade}
                </p>
                <p>
                  <strong>Review:</strong><br/> {review.review}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews available</p>
          )}
        </Slider>
      </div>
    </div>
  );
}
