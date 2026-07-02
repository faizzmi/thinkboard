import request from "supertest";
import { expect } from "chai";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import express from "express";
import notesRoutes from "../src/routes/notesRoutes.js";
import authRoutes from "../src/routes/authRoutes.js";

let app;
let mongod;
let token;

before(async () => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());

  app = express();
  app.use(express.json());
  app.use("/api/auth", authRoutes);
  app.use("/api/notes", notesRoutes);

  const signupRes = await request(app)
    .post("/api/auth/signup")
    .send({ name: "Test User", email: "test@example.com", password: "password123" });
  token = signupRes.body.token;
});

after(async () => {
  await mongoose.disconnect();
  await mongod.stop();
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
    expect(res.body).to.be.an("array");
  });

  it("get note by bad id return 404 or 500", async () => {
    const res = await request(app)
      .get("/api/notes/000000000000000000000000")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(404);
  });
});