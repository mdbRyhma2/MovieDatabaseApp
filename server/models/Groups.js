import { pool } from "../helpers/db.js";


// Function to insert a new group into the database
const insertGroup = async (group_name) => {
  return await pool.query(
    "INSERT INTO groups (group_name) VALUES ($1) RETURNING *",
    [group_name]
  );
};


//function to fetch group from database
const getGroups = async () => {
    return await pool.query(
      "SELECT * FROM groups"
    );
  };
  
//function to fetch group members from database
const getGroupMembers = async () => {
    return await pool.query(
      "SELECT users.id, users.username, users.first_name, users.last_name FROM users JOIN user_groups ON users.id = user_groups.user_id JOIN groups ON user_groups.group_id = groups.id WHERE groups.id = $1;"
    );
  };

export {getGroups, insertGroup, getGroupMembers};