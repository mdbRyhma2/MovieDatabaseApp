import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Showtimes() {
    const [areas, setAreas] = useState([])
    const [selectedArea, setSelectedArea] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [showtimes, setShowtimes] = useState([])

    const getFinnkinoTheatres = (xml) => {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xml,'application/xml')
        const theatres = xmlDoc.getElementsByTagName('TheatreArea')
        const tempAreas = []

        for (let i = 0; i < theatres.length; i++){
            tempAreas.push(
                {
                    "id": theatres[i].getElementsByTagName('ID')[0].textContent,
                    "name": theatres[i].getElementsByTagName('Name')[0].textContent
                }
            )
        }
        setAreas(tempAreas)
    }

    const getFinnkinoSchedules = (xml) => {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xml,'application/xml')
        const shows = xmlDoc.getElementsByTagName('Show')
        const tempShowtimes = []

        for (let i = 0; i < shows.length; i++){
            tempShowtimes.push(
                {
                    "title": shows[i].getElementsByTagName('Title')[0].textContent,
                    "theatre": shows[i].getElementsByTagName('Theatre')[0].textContent,
                    "startTime": shows[i].getElementsByTagName('dttmShowStart')[0].textContent,
                    "genres": shows[i].getElementsByTagName('Genres')[0].textContent,
                    "language": shows[i].getElementsByTagName('SpokenLanguage')[0].textContent,
                    "image": shows[i].getElementsByTagName('EventSmallImagePortrait')[0].textContent
                }
            )
        }
        setShowtimes(tempShowtimes)
    }

    const handleAreaChange = (e) => {
        const selectedId = e.target.value;
        console.log('Selected area ID: ' + selectedId)
        setSelectedArea(selectedId)
    }

    const handleDateChange = (d) => {
        const selectedDate = d.target.value;
        console.log('Selected date: ' + selectedDate)
        setSelectedDate(selectedDate)
    }

    useEffect(() => {
        if (!areas.lenght) {
            axios
            .get('https://www.finnkino.fi/xml/TheatreAreas/', {responseType: 'text'})
            .then((response) => {
                getFinnkinoTheatres(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.error(error)
            })
        }

        if (selectedArea || selectedDate) {
            let url = 'https://www.finnkino.fi/xml/Schedule/'
            if (selectedArea) url += `?area=${selectedArea}`
            if (selectedDate) url += (selectedArea ? '&' : '?') + `dt=${selectedDate}`
            axios
            .get(url, {responseType: 'text'})
            .then((response) => {
                getFinnkinoSchedules(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.error(error)
            })
        }
    }, [selectedArea, selectedDate])

    return (
        <div>
            <input type='date' id='date' onChange={handleDateChange} />
            <select onChange={handleAreaChange}>
                {areas.map((area) => (
                    <option key={area.id} value={area.id}>
                        {area.name}
                    </option>
                ))}
            </select>
            <div>
                <h2>Showtimes</h2>
                {showtimes.length > 0 ? (
                    <ul>
                        {showtimes.map((show, index) => (
                            <li key={index}>
                                <h3>{show.title}</h3>
                                <p><strong>Theatre:</strong>{show.theatre}</p>
                                <p><strong>Start Time:</strong>{new Date(show.startTime).toLocaleString()}</p>
                                <p><strong>Genres:</strong>{show.genres}</p>
                                <p><strong>Language:</strong>{show.language}</p>
                                {show.image && (
                                    <img
                                        src={show.image}
                                        alt={show.title}
                                        style={{width: '150px', height: 'auto'}}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                ): (
                    <p>No showtimes available for the selected filters</p>
                )}
            </div>
        </div>
    )
}