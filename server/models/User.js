import { pool } from "../helpers/db.js";

// Function to insert a new user into the database
const insertUser = async (email, hashedPassword) => {
  return await pool.query(
    "insert into users (email,password) values ($1,$2) returning *",
    [email, hashedPassword]
  );
};

// Function to select a user from the database by email
const selectUserByEmail = async (email) => {
  return await pool.query("select * from users where email=$1", [email]);
};

export { insertUser, selectUserByEmail };
