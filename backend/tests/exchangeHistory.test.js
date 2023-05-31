const request = require("supertest");
const app = require("../server");
const { setupUser, userOne } = require("./fixtures/db");

beforeEach(setupUser);

describe("Exchange History Controller", () => {
  it("should not create a new exchange record without authentication", async () => {
    const res = await request(app)
      .post("/api/exchange-history")
      .send({ amount: 100, baseCurrency: "USD", targetCurrency: "EUR", rate: 0.85, total: 85 });
    expect(res.statusCode).toEqual(401);
  });

  it("should create a new exchange record with authentication", async () => {
    const res = await request(app)
      .post("/api/exchange-history")
      .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
      .send({ amount: 100, baseCurrency: "USD", targetCurrency: "EUR", rate: 0.85, total: 85 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
  });
});
