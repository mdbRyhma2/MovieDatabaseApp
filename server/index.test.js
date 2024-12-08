import { initializeTestDb, insertTestUser, getToken } from "./helpers/test.js";

const base_url = "http://localhost:3001"; // Base URL for API endpoints

import { expect } from "chai";

describe("POST register", () => {
  // Initialize the test database before the tests
  before(() => {
    initializeTestDb();
  });

  const email = `register@foo.com`;
  const first_name = "FirstName";
  const last_name = "LastName";
  const valid_password = "Register123";

  // Tests for registration
  it("should not post a user with less than 8 character password", async () => {
    const short_password = "short1";
    const username = "username1";
    const response = await fetch(base_url + "/user/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: first_name,
        last_name: last_name,
        password: short_password,
      }),
    });
    const data = await response.json();
    expect(response.status).to.equal(400, data.error);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("error");
  });

  it("should not post a user with password that doesn't have an uppercase letter", async () => {
    const invalid_password = "register123";
    const username = "username2";
    const response = await fetch(base_url + "/user/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: first_name,
        last_name: last_name,
        password: invalid_password,
      }),
    });
    const data = await response.json();
    expect(response.status).to.equal(400, data.error);
    expect(data).to.be.an("object");
    expect(data.error).to.equal("Password must have at least one uppercase letter and one number")
  });

  it("should not post a user with password that doesn't have a number", async () => {
    const invalid_password = "Register";
    const username = "username2";
    const response = await fetch(base_url + "/user/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: first_name,
        last_name: last_name,
        password: invalid_password,
      }),
    });
    const data = await response.json();
    expect(response.status).to.equal(400, data.error);
    expect(data).to.be.an("object");
    expect(data.error).to.equal("Password must have at least one uppercase letter and one number")
  });

  it("should register with valid email, username and password (first_name and last_name optional)", async () => {
    const username = "username2";
    const response = await fetch(base_url + "/user/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: first_name,
        last_name: last_name,
        password: valid_password,
      }),
    });
    const data = await response.json();
    expect(response.status).to.equal(201, data.error);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("id", "email", "username");
  });

  it("should register without first_name and last_name", async () => {
    const username = "username3";
    const email = `register2@foo.com`;
    const response = await fetch(base_url + "/user/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: valid_password,
      }),
    });
    const data = await response.json();
    expect(response.status).to.equal(201, data.error);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("id", "email", "username");
    expect(data).to.not.have.property("first_name");
    expect(data).to.not.have.property("last_name");
  });
});

// Tests for login
describe("POST login", () => {
  const email = "login@foo.com";
  const username = "loginuser";
  const password = "login123";

  before(async () => {
    await insertTestUser(email, username, "FirstName", "LastName", password);
  });

  it("should login with valid email and password", async () => {
    const response = await fetch(base_url + "/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: email, password: password }),
    });
    const data = await response.json();
    expect(response.status).to.equal(200, data.error);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("id", "email", "username", "token");
  });

  it("should login with valid username and password", async () => {
    const response = await fetch(base_url + "/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: username, password: password }),
    });
    const data = await response.json();
    expect(response.status).to.equal(200, data.error);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("id", "email", "username", "token");
  });

  it("should not login with invalid email/username", async () => {
    const response = await fetch(base_url + "/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: "wrongemail@foo.com", password: password }),
    });
    const data = await response.json();
    expect(response.status).to.equal(401);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("error");
    expect(data.error).to.equal("Invalid credentials.");
  });

  it("should not login with invalid password", async () => {
    const response = await fetch(base_url + "/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: email, password: "wrongpassword" }),
    });
    const data = await response.json();
    expect(response.status).to.equal(401);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("error");
    expect(data.error).to.equal("Invalid credentials.");
  });
});

// Tests for logout
describe("POST logout", () => {
  const email = "logout@foo.com";
  const username = "logoutuser";
  const password = "Logout123";

  let token;

  before(async () => {
    const user = await insertTestUser(email, username, "FirstName", "LastName", password);
    token = getToken(user.id);
  });

  it("should logout successfully with a valid token", async () => {
    const response = await fetch(base_url + "/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data).to.be.an("object");
    expect(data).to.include.keys("message");
    expect(data.message).to.equal("Logged out successfully");
  });

  it("should return an error when trying to access a protected route after logout", async () => {
    const response = await fetch(base_url + "/user/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    expect(response.status).to.equal(401);
    expect(data).to.be.an("object");
    expect(data.error).to.equal("Unauthorized access");
  });
});

// Test for delete
describe("DELETE /user/profile", () => {
  const email = "delete@foo.com";
  const username = "delete";
  const password = "delete123";
  const user = insertTestUser(email, username, "FirstName", "LastName", password);
  const token = getToken(user.id);

  it("should delete the user account", async () => {
    const response = await fetch(base_url + "/user/delete/1", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    expect(response.status).to.equal(200);
    expect(data).to.be.an("object")
    expect(data).to.include.all.keys("id");
  });
});
