import request from "supertest";
import { app } from "../src/app";
import connection from "../src/database/connection";
import faker from "faker";

describe("Points", () => {
  afterEach(async () => {
    await connection("point_items").delete("*");
    await connection("points").delete("*");
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new point", async () => {
    const response = await request(app)
      .post("/points")
      .attach("image", "uploads/1e01a64c72db-download.jpeg")
      .field("name", "mercado")
      .field("email", "mercado@mercado.com")
      .field("whatsapp", 123456789)
      .field("latitude", -46.0)
      .field("longitude", -23.0)
      .field("city", "São Paulo")
      .field("uf", "SP")
      .field("items", "1,2,3");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("should be able to list a specific point by id", async () => {
    const createdPoint = await request(app)
      .post("/points")
      .attach("image", "uploads/1e01a64c72db-download.jpeg")
      .field("name", "mercado")
      .field("email", "mercado@mercado.com")
      .field("whatsapp", 123456789)
      .field("latitude", -46.0)
      .field("longitude", -23.0)
      .field("city", "São Paulo")
      .field("uf", "SP")
      .field("items", "1,2,3");

    const { id } = createdPoint.body;
    const response = await request(app).get(`/points/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("point");
    expect(response.body).toHaveProperty("items");
  });

  it("should returns 400 if a point is not found with the provided id", async () => {
    const response = await request(app).get("/points/1");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Point not found.");
  });

  it("should be able to list a point with specific filter (uf, city, items))", async () => {
    await request(app)
      .post("/points")
      .attach("image", "uploads/1e01a64c72db-download.jpeg")
      .field("name", "mercado")
      .field("email", "mercado@mercado.com")
      .field("whatsapp", 123456789)
      .field("latitude", -46.0)
      .field("longitude", -23.0)
      .field("city", "São Paulo")
      .field("uf", "SP")
      .field("items", "1,2,3");
    const city = "São Paulo";
    const uf = "SP";
    const response = await request(app)
      .get("/points")
      .query({ city, uf, items: "1,2" });

    expect(response.status).toBe(200);
  });
});
