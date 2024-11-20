import { initializeTestDb, insertTestUser, getToken } from "./helpers/test.js";

const base_url = "http://localhost:3001"; // Base URL for API endpoints

import { expect } from "chai";

describe("POST register", () => {
  // Initialize the test database before the tests
  before(() => {
    initializeTestDb();
  });

  const email = `register_${Date.now()}@foo.com`;
  const first_name = "Reg";
  const last_name = "Ister";
  const valid_password = "register123";

  // Tests for registration
  it("should not post a user with less than 8 character password", async () => {
    const short_password = "short1";
    const username = "user1";
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

  it("should register with valid email, username and password (first_name and last_name optional)", async () => {
    const username = "user2";
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
    const username = "user3";
    const email = `register2_${Date.now()}@foo.com`;
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
  const username = "login_user";
  const password = "login123";

  before(async () => {
    initializeTestDb();
    await insertTestUser(email, username, "Test", "User", password); // Ensure this runs before tests
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