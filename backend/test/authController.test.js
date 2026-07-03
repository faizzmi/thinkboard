import request from "supertest";
import { expect } from "chai";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import express from "express";
import authRoutes from "../src/routes/authRoutes.js";

let app;
let mongod;

before(async () => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());

  app = express();
  app.use(express.json());
  app.use("/api/auth", authRoutes);

  await request(app)
    .post("/api/auth/signup")
    .send({ name: "Existing User", email: "existing@example.com", password: "password123" });
});

after(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe("GET /api/auth/check-email", () => {
  it("returns exists:true for a registered email", async () => {
    const res = await request(app).get("/api/auth/check-email?email=existing@example.com");
    expect(res.status).to.equal(200);
    expect(res.body.exists).to.be.true;
  });

  it("returns exists:false for an unregistered email", async () => {
    const res = await request(app).get("/api/auth/check-email?email=new@example.com");
    expect(res.status).to.equal(200);
    expect(res.body.exists).to.be.false;
  });

  it("returns 400 when email is missing", async () => {
    const res = await request(app).get("/api/auth/check-email");
    expect(res.status).to.equal(400);
  });
});