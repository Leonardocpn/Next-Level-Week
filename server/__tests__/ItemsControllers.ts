import request from "supertest";
import { app } from "../src/app";
import connection from "../src/database/connection";

describe("Items", () => {
  afterAll(async () => {
    await connection.destroy();
  });

  it("should returns all registered items", async () => {
    const response = await request(app).get("/items");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(6);
  });
});
