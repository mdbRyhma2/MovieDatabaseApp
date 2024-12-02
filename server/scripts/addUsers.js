import bcrypt from 'bcrypt';
import pkg from 'pg';
const { Pool } = pkg;

// Database connection details
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'movieapp',
  password: '',
  port: 5432,
}); 


// Users to insert
const users = [
  { email: 'user1@example.com', username: 'user1', first_name: 'First1', last_name: 'Last1', password: 'password1' },
  { email: 'user2@example.com', username: 'user2', first_name: 'First2', last_name: 'Last2', password: 'password2' },
  { email: 'user3@example.com', username: 'user3', first_name: 'First3', last_name: 'Last3', password: 'password3' },
  { email: 'user4@example.com', username: 'user4', first_name: 'First4', last_name: 'Last4', password: 'password4' },
  { email: 'user5@example.com', username: 'user5', first_name: 'First5', last_name: 'Last5', password: 'password5' },
  { email: 'user6@example.com', username: 'user6', first_name: 'First6', last_name: 'Last6', password: 'password6' }
];

// Function to hash the passwords and insert users
async function addUsers() {
  try {
    await pool.connect(); // Connect to database

    for (let user of users) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(user.password, 10); // 10 rounds of salt

      // Insert user with hashed password
      const query = `
        INSERT INTO users (email, username, first_name, last_name, password)
        VALUES ($1, $2, $3, $4, $5)
      `;
      const values = [user.email, user.username, user.first_name, user.last_name, hashedPassword];

      await pool.query(query, values); // Execute the insert query
      console.log(`Inserted user: ${user.username}`);
    }

    console.log('All users inserted successfully');
  } catch (err) {
    console.error('Error inserting users:', err);
  } finally {
    await pool.end(); // Close database connection
  }
}

// Call the function to insert users
addUsers();