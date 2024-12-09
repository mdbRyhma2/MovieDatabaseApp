import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './Groups.css';

export default function Group({deleteGroup}) {

  const { id } = useParams();
  const [groupName, setGroupName] = useState(null);
  const navigate = useNavigate();

  const [members, setMembers] = useState([
    { id: 1, username: 'user1' },
    { id: 2, username: 'user2' },
    { id: 3, username: 'user3' }
  ]);


  const defaultImage = "https://via.placeholder.com/50";


  const [movies] = useState([
    { id: 1, title: 'Movie 1' },
    { id: 2, title: 'Movie 2' },
    { id: 3, title: 'Movie 3' },
    { id: 4, title: 'Movie 4' }
  ]);


  useEffect(() => {
    const fetchGroupById = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/group/group/${id}`);

        const groupName = response.data.rows[0].group_name;
        setGroupName(groupName);

      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    fetchGroupById();
  }, [id]);



  const deleteUser = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const joinOrLeaveGroup = () => {
    alert('Join/Leave group action triggered.');
  };


//delete group
  const deleteGroupPage = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this group and all its data?"
    );
  
    if (!confirmDelete) {
      return;
    }
    try {
      console.log("before axios")
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/group/group/${id}`);
      console.log("after axios")
      console.log(id)
      alert("Group deleted successfully");
//navigate back to groups page
      navigate("/groups");
    } catch (error) {
      console.error("Error deleting group:", error);
      alert("Failed to delete group.");
    }
  };

  return (
    <div className="container">
      <header className="header">
      <img src={defaultImage} alt="Group Default" className="group-image" />
        <div className="group-name">
          <h1>{groupName}</h1>
        </div>
        <div className="actions">
          <button onClick={joinOrLeaveGroup}>Join/leave group</button>
          <button onClick={deleteGroupPage}>Delete group</button>
        </div>
      </header>

      <section className="members">
        <h2>Group members</h2>
        <div className="members-list">
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              {member.username} {member.first_name} {member.last_name}
              <button onClick={() => deleteUser(member.id)}>Delete user</button>
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