import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod;

export const mochaHooks = {
  async beforeAll() {
    this.timeout(60000); // allow up to 60s for first-time binary download
    process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
  },
  async afterAll() {
    await mongoose.disconnect();
    if (mongod) {
      await mongod.stop();
    }
  },
};