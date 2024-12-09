import { pool } from "../helpers/db.js";


// Function to insert a new group into the database
const insertGroup = async (group_name) => {
  return await pool.query(
    "INSERT INTO groups (group_name) VALUES ($1) RETURNING *",
    [group_name]
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
  
//function to fetch group members from database
const getGroupMembers = async (group_id) => {
    return await pool.query(
      `SELECT users.id, users.username, users.first_name, users.last_name
      FROM users 
      JOIN user_groups ON users.id = user_groups.user_id
      JOIN groups ON user_groups.group_id = groups.id
      WHERE groups.id = $1;`,
      [group_id]
    );
  };

  //function to delete group
  const deleteGroup = async (id) => {
    return await pool.query(
      
      "DELETE FROM groups WHERE id = $1 RETURNING *"
      
      , [id]);
  };



export {getGroups, getGroupById, insertGroup, getGroupMembers, deleteGroup};