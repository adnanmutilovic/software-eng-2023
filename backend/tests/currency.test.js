const request = require("supertest");
const app = require("../server");

describe("Currency Controller", () => {
  it("should return a list of currencies", async () => {
    const res = await request(app).get("/api/currencies");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
