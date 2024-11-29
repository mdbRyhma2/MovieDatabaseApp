import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Groups.css"


export default function Groups() {

  const [groupName, setGroupName] = useState("");
  const [message, setMessage] = useState("");
  const [groupData, setGroupData] = useState([])
  const [error, setError] = useState(null);

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/groups/groups`,{
        group_name: groupName,
      });
    
      setMessage(`Group "${response.data.group_name}" created`);
      setGroupData([...groupData, response.data]);
      setGroupName("");
    } catch (error) {
      console.error("Error creating group:", error);
      setMessage("Failed to create group. Please try again.");
    }
  };

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
  }, []); 


  return (
    <div id="container">
      <section className="groups">
        <h2>Groups</h2>
        <div className="group-list">
          <ul>
            {groupData.map((group) => (
              <li key={group.id}>
                <Link to={`/group/${group.id}`}>{group.group_name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div id="create-group">
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
    </div>
  );
}
