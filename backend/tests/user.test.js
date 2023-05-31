const request = require("supertest");
const app = require("../server");
const User = require("../models/User");
const { setupUser, userOne } = require("./fixtures/db");

beforeEach(setupUser);

describe("User Controller", () => {
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({ username: "testuser", email: "test@example.com", password: "testpass123" });
    expect(res.statusCode).toEqual(201);

    const user = await User.findOne({ email: "test@example.com" });
    expect(user).not.toBeNull();
  });

  it("should log in an existing user", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: userOne.email, password: "testpass123" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
