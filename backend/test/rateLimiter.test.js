// backend/test/rateLimiter.test.js
import { expect } from "chai";
import sinon from "sinon";
import ipRateLimiter from "../src/middleware/ipRateLimiter.js";
import ratelimit from "../src/config/upstash.js";

describe("ipRateLimiter middleware", () => {
  afterEach(() => sinon.restore());

  it("calls next() when limit not exceeded", async () => {
    sinon.stub(ratelimit, "limit").resolves({ success: true });

    const req = { ip: "1.2.3.4" };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await ipRateLimiter(req, res, next);

    expect(next.calledOnce).to.be.true;
    expect(res.status.called).to.be.false;
  });

  it("returns 429 when limit exceeded", async () => {
    sinon.stub(ratelimit, "limit").resolves({ success: false });

    const req = { ip: "1.2.3.4" };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await ipRateLimiter(req, res, next);

    expect(res.status.calledWith(429)).to.be.true;
    expect(next.called).to.be.false;
  });

  it("keys the limiter by request IP", async () => {
    const limitSpy = sinon.stub(ratelimit, "limit").resolves({ success: true });

    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await ipRateLimiter({ ip: "1.1.1.1" }, res, next);
    await ipRateLimiter({ ip: "2.2.2.2" }, res, next);

    expect(limitSpy.firstCall.args[0]).to.equal("1.1.1.1");
    expect(limitSpy.secondCall.args[0]).to.equal("2.2.2.2");
  });

  it("propagates errors to next() instead of crashing the request", async () => {
    sinon.stub(ratelimit, "limit").rejects(new Error("redis unreachable"));

    const req = { ip: "1.2.3.4" };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await ipRateLimiter(req, res, next);

    expect(next.calledOnce).to.be.true;
    expect(next.firstCall.args[0]).to.be.instanceOf(Error);
  });
});