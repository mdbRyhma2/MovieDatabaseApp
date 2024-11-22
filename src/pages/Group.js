import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Group.css";

export default function Group() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState(null);

  const defaultImage = "https://via.placeholder.com/50";

  const fetchGroups = async () => {
    try {
      const response = await axios.get("http://localhost:3000/group");
      console.log("Fetched groups:", response.data);
      setGroups(response.data);
    } catch (err) {
      setError("Failed to fetch groups");
    }
  };

  const addGroup = async () => {
    if (!groupName) return;
    try {
      const response = await axios.post("http://localhost:3000/group", {
        name: groupName,
      });
      setGroups([...groups, response.data]);
      setGroupName("");
    } catch (err) {
      setError("Failed to add group");
    }
  };

  const deleteGroup = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/group/${id}`);
      setGroups(groups.filter((group) => group.id !== id));
    } catch (err) {
      setError("Failed to delete group");
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="container">
      <h1>Groups</h1>
      <div className="group-info">
        <img src={defaultImage} alt="Group Default" className="group-image" />
        <h2> Group Name</h2>
        <button onClick={() => deleteGroup}className="delete-button">Delete</button>
      </div>
      <div></div>
    </div>
  );
}
