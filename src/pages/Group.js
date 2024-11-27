import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import './Group.css';

export default function Group() {

  const { id } = useParams();
  const location = useLocation();
  const groupName = location.state?.groupName || `Group ${id}`;

  const defaultImage = "https://via.placeholder.com/50";

  const [members, setMembers] = useState([
    { id: 1, username: 'User', role: 'Owner' },
    { id: 2, username: 'Username1', role: 'Member' },
    { id: 3, username: 'Username2', role: 'Member' },
    { id: 4, username: 'Username3', role: 'Member' },
    { id: 5, username: 'Username4', role: 'Member' }
  ]);

  const [movies] = useState([
    { id: 1, title: 'Movie 1' },
    { id: 2, title: 'Movie 2' },
    { id: 3, title: 'Movie 3' },
    { id: 4, title: 'Movie 4' }
  ]);


  const deleteUser = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const joinOrLeaveGroup = () => {
    alert('Join/Leave group action triggered.');
  };

  const deleteGroup = () => {
    alert('Delete group action triggered.');
  };

  return (
    <div className="container">
      <header className="header">
      <img src={defaultImage} alt="Group Default" className="group-image" />
        <div className="group-name">
          <h1>{groupName}</h1>
        </div>
        <div className="actions">
          <button onClick={joinOrLeaveGroup}>Join group / Leave group</button>
          <button onClick={deleteGroup}>Delete group</button>
        </div>
      </header>

      <section className="members">
        <h2>Group members</h2>
        <div className="members-list">
          <ul>
            {members.map((member) => (
              <li key={member.id}>
                {member.username} 
                {member.role === 'Owner' ? (
                  <span> (group owner)</span>
                ) : (
                  <button onClick={() => deleteUser(member.id)}>Delete user</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="movies">
        <h2>Movies</h2>
        <div className="movies-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie">
              <div className="movie-poster"></div>
              <div className="movie-title">{movie.title}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};