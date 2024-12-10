import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Groups.css"
import { UserContext } from "../context/userContext";


export default function Groups() {

  const { user } = useContext(UserContext);
  const [groupName, setGroupName] = useState("");
  const [message, setMessage] = useState("");
  const [groupData, setGroupData] = useState([])
  const [error, setError] = useState(null);


  //handle create group button click event
  const handleCreateGroup = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/groups/groups`,{
        group_name: groupName,
        owner_id: user.id
      });

    console.log("id", user.id)
      setMessage(`Group "${response.data.group_name}" created`);
      setGroupData([...groupData, response.data]);
      setGroupName("");
    } catch (error) {
      console.error("Error creating group:", error);
      setMessage("Failed to create group. Please try again.");
    }
  };

// fetch groups
   useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/groups/groups`);
        setGroupData(response.data);

      } catch (error) {
        setError("Failed to fetch group data ")
        console.error(error);
      }
    };

    fetchGroups();
  }, [groupData]); 

  return (
    <div id="container">

            <div className="create-group">
      <h2>Create a New Group</h2>
      <form onSubmit={handleCreateGroup}>
        <label htmlFor="groupName">Group Name:</label>
        <input
          type="text"
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />
        <button type="submit">Create Group</button>
      </form>
      {message && <p>{message}</p>}
    </div>

      <section className="groups">
        <h2>Groups</h2>
        <div className="group-list">
          <ul>
            {
              groupData.map(group => (
              <li key={group.id}>
                <Link to={{pathname: `/group/${group.id}`, state :{ groupData: group }, }}>{group.group_name}</Link>
{/*                 <button onClick= {() => deleteGroup(group.id)} >Delete Group</button> */}
              </li>
            ))}
          </ul>
        </div>
      </section>


    </div>
  );
}
