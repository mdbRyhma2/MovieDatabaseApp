import { pool } from "../helpers/db.js";


  //GROUP

// Function to insert a new group into the database
const insertGroup = async (group_name, owner_id) => {
  return await pool.query(
    "INSERT INTO groups (group_name, owner_id) VALUES ($1, $2) RETURNING *",
    [group_name, owner_id]
  );
};

//function to fetch groups from database
const getGroups = async () => {
    return await pool.query(
      "SELECT * FROM groups"
    );
  };

//function to fetch group from database by id
const getGroupById = async (id) => {
    return await pool.query(
      "SELECT * FROM groups WHERE id = $1",
      [id]
    );
  };

  //function to delete group
  const deleteGroup = async (id) => {
    return await pool.query(
      
      "DELETE FROM groups WHERE id = $1 RETURNING *"
      
      , [id]);
  };
  //GROUP MEMBERS

// Function to insert a new groupmember into the database
const insertGroupMember = async (user_id, group_id) => {
  return await pool.query(
    "INSERT INTO user_groups (user_id, group_id) VALUES ($1, $2) RETURNING *",
    [user_id, group_id]
  );
};

//function to fetch group members from database
const getGroupMembers = async (group_id) => {
    return await pool.query(
      `SELECT users.username
      FROM users 
      JOIN user_groups ON users.id = user_groups.user_id
      WHERE user_groups.group_id = $1;`,
      [group_id]
    );
  };


  //function to delete groupmember
  const deleteGroupMember = async (user_id) => {
    return await pool.query(
      "DELETE FROM user_groups WHERE user_id = $1 RETURNING *"
      , [user_id]);
  };


export {getGroups, getGroupById, insertGroup, getGroupMembers, deleteGroup, insertGroupMember, deleteGroupMember};