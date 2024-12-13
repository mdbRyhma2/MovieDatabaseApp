import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./Group.css";
import { UserContext } from "../context/userContext";

export default function Group({}) {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [groupName, setGroupName] = useState(null);
  const [movies, setMovies] = useState([]);
  const [ownerId, setOwnerId] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [members, setMembers] = useState(() => {
    const savedMembers = localStorage.getItem("members");
    return savedMembers ? JSON.parse(savedMembers) : [];
  });
  const navigate = useNavigate();


  const defaultImage = "https://via.placeholder.com/50";

  //GROUP

  //fetch group by id
  useEffect(() => {
    const fetchGroupById = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/group/group/${id}`
        );
        // fetch group_name and owner_id from database
        const groupName = response.data.rows[0].group_name;

        const ownerId = response.data.rows[0].owner_id;
        setGroupName(groupName);
        setOwnerId(ownerId);

        //check if you are owner. Only owner can delete group and groupmembers
        if (ownerId === user.id) {
          setIsOwner(true);
        }
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };


    const fetchGroupMovies = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/group/getGroupMovies/` + id
        );

        setMovies(response.data)


      } catch (error) {
        console.error("Error fetching group movies:", error);
      }
    }

    const fetchGroupMembers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/group/groupmember/${id}`
        );
        const groupMembers = response.data;
        setMembers(groupMembers);
        //check if u are member if u are not u can join group
        const isMember = groupMembers.some(
          (member) => member.username === user.username
        );
        setIsMember(isMember);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGroupById();

    // Is the user token present get group movies else empty the list
    if (user.token){
      fetchGroupMembers();
      fetchGroupMovies();
    } else {
      setMovies([])
      setMembers([])
    }


  }, [id, user.id]);

  //delete group
  const deleteGroupPage = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this group and all its data?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/group/group/${id}`
      );
      alert("Group deleted successfully");
      //navigate back to groups page
      navigate("/groups");
    } catch (error) {
      console.error("Error deleting group:", error);
      alert("Failed to delete group.");
    }
  };

  //GROUPMEMBERS

  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);


  //join group
  const joinGroup = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/group/group/${id}`,
        {
          user_id: user.id,
          group_id: id,
        }
      );
      //add user to members array
      setMembers((prevMembers) => [...prevMembers, user]);
      alert("You joined group", groupName);
      setIsMember(true);
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  //delete groupMember or leave a group
  const deleteGroupMember = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this groupmember?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/group/groupmember/${id}`,
        {
          data: {
            user_id: user.id,
          },
        }
      );
      alert("Groupmember deleted successfully");
      //delete user from members array
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.username !== user.username)
      );
      setIsMember(false);
    } catch (error) {
      console.error("Error deleting groupmember:", error);
      alert("Failed to delete groupmember.");
    }
  };

  const handleRemoveFromGroupMoviesClick = async (movie_id) => {

    try {
      await axios.delete(process.env.REACT_APP_API_URL + '/groups/removeFromUserMovies',{
        data: {
        groupId : id,
        movieId : movie_id
        }}
      )

        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.movie_id !== movie_id)
        ) 
    } catch (error) {
      console.error("Failed to remove movie from group list: ", error.status)
    }

  }

  return (
    <div className="container">
      <header className="header">
        <img src={defaultImage} alt="Group Default" className="group-image" />
        <div className="group-name">
          <h1>{groupName}</h1>
        </div>
        <div className="actions">
          <p>
            {isMember
              ? "You are a member of the group"
              : "You are not a member of the group"}
          </p>
          {isMember ? (
            <button onClick={deleteGroupMember}>Leave Group</button>
          ) : (
            <button onClick={joinGroup}>Join Group</button>
          )}

          {isOwner ? (
            <button onClick={deleteGroupPage}>Delete group</button>
          ) : (
            ""
          )}
        </div>
      </header>

      <section className="members">
        <h2>Group members</h2>
        <div className="members-list">
          <ul>
            {members.map((member) => (
              <li key={member.user_id}>
                {member.username}
                {member.role}
                {isOwner && (
                  <button onClick={() => deleteGroupMember(member.user_id)}>
                    Delete user from group
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="movies">
  <h2>Movies</h2>
  <div className="movies-grid">
    {movies.map((movie) => (
          <li key={movie.movie_id} className="movie-card">
            {movie.poster_path ? (
              <Link to={`/movie/${movie.movie_id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
            ) : (
              <p>No Image Available</p>
            )}
            <Link to={`/movie/${movie.movie_id}`}>{movie.movie_title}</Link>
            <button onClick={() => handleRemoveFromGroupMoviesClick(movie.movie_id)}>Remove</button>
          </li>
    ))}
  </div>
</section>

    </div>
  );
}
