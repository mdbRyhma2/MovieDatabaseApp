import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import { Pool } from "pg";

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRouter);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message });
});

app.listen(port, () => console.log(`Server running on port ${port}`));


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mpvieapp",
  password: "Pass",
  port: 5432,
});


app.get("/group", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM groups");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Error fetching groups");
  }
});

app.post("/group", async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      "INSERT INTO groups (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send("Error adding group");
  }
});

app.delete("/group/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM groups WHERE id = $1", [id]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send("Error deleting group");
  }
});



