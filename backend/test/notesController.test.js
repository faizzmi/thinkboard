import request from "supertest";
import { expect } from "chai";
import express from "express";
import notesRoutes from "../src/routes/notesRoutes.js";
import authRoutes from "../src/routes/authRoutes.js";

let app;
let token;

before(async () => {
  app = express();
  app.use(express.json());
  app.use("/api/auth", authRoutes);
  app.use("/api/notes", notesRoutes);

  const signupRes = await request(app)
    .post("/api/auth/signup")
    .send({ name: "Test User", email: "test@example.com", password: "password123" });
  token = signupRes.body.token;
});

describe("Notes API", () => {
  it("create note return 201", async () => {
    const res = await request(app)
      .post("/api/notes/")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "test", content: "content here" });
    expect(res.status).to.equal(201);
  });

  it("get all notes return array", async () => {
    const res = await request(app)
      .get("/api/notes/")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body.notes).to.be.an("array");   // <-- this line is the actual assertion fix
  });

  it("get note by bad id return 404 or 500", async () => {
    const res = await request(app)
      .get("/api/notes/000000000000000000000000")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(404);
  });
});