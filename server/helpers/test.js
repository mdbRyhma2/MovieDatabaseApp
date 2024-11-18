import fs from "fs";
import path from "path";
import { pool } from "./db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const { sign, verify } = jwt;
const { hash } = bcrypt;

const __dirname = import.meta.dirname;

// Function to initialize the test database using a SQL script
const initializeTestDb = () => {
  const sql = fs.readFileSync(path.resolve(__dirname, "../movieapp.sql"), "utf8");
  pool.query(sql);
};

// Function to insert a test user into the database
const insertTestUser = (email, password) => {
  hash(password, 10, (error, hashedPassword) => {
    pool.query("insert into users (email,password) values ($1,$2)", [
      email,
      hashedPassword,
    ]);
  });
};

// Function to generate a JWT token for a test user
const getToken = (email) => {
  return sign({ user: email }, process.env.JWT_SECRET_KEY);
};

export { initializeTestDb, insertTestUser, getToken };
