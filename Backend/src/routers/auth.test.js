const request = require("supertest");
const app = require("../server");

describe("Auth API", () => {
  it("should register user", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
  });
});