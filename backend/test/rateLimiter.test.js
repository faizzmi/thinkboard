import { expect } from "chai";
import sinon from "sinon";
import rateLimiter from "../src/middleware/rateLimiter.js";
import ratelimit from "../src/config/upstash.js";

describe("rateLimiter middleware", () => {
  afterEach(() => sinon.restore());

  it("calls next() when limit not exceeded", async () => {
    sinon.stub(ratelimit, "limit").resolves({ success: true });

    const req = { ip: "1.2.3.4" };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await rateLimiter(req, res, next);

    expect(next.calledOnce).to.be.true;
    expect(res.status.called).to.be.false;
  });

  it("returns 429 when limit exceeded", async () => {
    sinon.stub(ratelimitModule, "limit").resolves({ success: false });

    const req = { ip: "1.2.3.4" };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await rateLimiter(req, res, next);

    expect(res.status.calledWith(429)).to.be.true;
    expect(next.called).to.be.false;
  });

  it("uses different keys for different IPs", async () => {
    const limitSpy = sinon.stub(ratelimitModule, "limit").resolves({ success: true });

    const req1 = { ip: "1.1.1.1" };
    const req2 = { ip: "2.2.2.2" };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await rateLimiter(req1, res, next);
    await rateLimiter(req2, res, next);

    expect(limitSpy.firstCall.args[0]).to.equal("1.1.1.1");
    expect(limitSpy.secondCall.args[0]).to.equal("2.2.2.2");
  });
});