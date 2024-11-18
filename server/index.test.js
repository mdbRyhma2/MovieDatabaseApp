import { initializeTestDb, insertTestUser, getToken } from "./helpers/test.js";

const base_url = "http://localhost:3001"; // Base URL for API endpoints

import { expect } from "chai";

describe("POST register", () => {
  // Initialize the test database before the tests
  before(() => {
    initializeTestDb();
  });

  // Test for registration
  const email = "register@foo.com";
  const password = "register123";

  it("should not post a user with less than 8 character password", async () => {
    const password = "short1";
    const response = await fetch(base_url + "/user/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    expect(response.status).to.equal(400, data.error);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("error");
  });

  it("should register with valid email and password", async () => {
    const response = await fetch(base_url + "/user/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    expect(response.status).to.equal(201, data.error);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("id", "email");
  });
});

// Test for login
describe("POST login", () => {
  const email = "login@foo.com";
  const password = "login123";
  insertTestUser(email, password);
  it("should login with valid credentials", async () => {
    const response = await fetch(base_url + "/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    expect(response.status).to.equal(200, data.error);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("id", "email", "token");
  });
});
