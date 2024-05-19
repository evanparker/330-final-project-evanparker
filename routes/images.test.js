const request = require("supertest");

const server = require("../server");
const testUtils = require("../test-utils");

const User = require("../models/user");
const Image = require("../models/image");

describe("/images", () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(testUtils.clearDB);

  const image0 = { image: "http://example.com/image1.jpg" }
  const image1 = { image: "http://example.com/image2.jpg" }

  describe("Before login", () => {
    describe("POST /", () => {
      it("should send 401 without a token", async () => {
        const res = await request(server).post("/images").send(image0);
        expect(res.statusCode).toEqual(401);
      });
      it("should send 401 with a bad token", async () => {
        const res = await request(server)
          .post("/images")
          .set("Authorization", "Bearer BAD")
          .send(image0);
        expect(res.statusCode).toEqual(401);
      });
    });
  });

  describe("after login", () => {
    const user0 = {
      email: "user0@mail.com",
      username: "user0",
      password: "123password",
    };
    const user1 = {
      email: "user1@mail.com",
      username: "user1",
      password: "456password",
    };
    let token0;
    let token1;
    beforeEach(async () => {
      await request(server).post("/auth/signup").send(user0);
      const res0 = await request(server).post("/auth/login").send(user0);
      token0 = res0.body.token;
      await request(server).post("/auth/signup").send(user1);
      const res1 = await request(server).post("/auth/login").send(user1);
      token1 = res1.body.token;
    });
    describe("POST /", () => {
      it("should send 200", async () => {
        const res = await request(server)
          .post("/images")
          .set("Authorization", "Bearer " + token0)
          .send(image0);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject(image0);
      });
      it("should store image with userId", async () => {
        await request(server)
          .post("/images")
          .set("Authorization", "Bearer " + token0)
          .send(image0);
        const user = await User.findOne({ email: user0.email }).lean();
        const savedImage = await Image.findOne({ userId: user._id }).lean();
        expect(savedImage).toMatchObject(image0);
      });
      it("should store image with userId for user1", async () => {
        await request(server)
          .post("/images")
          .set("Authorization", "Bearer " + token1)
          .send(image1);
        const user = await User.findOne({ email: user1.email }).lean();
        const savedImage = await Image.findOne({ userId: user._id }).lean();
        expect(savedImage).toMatchObject(image1);
      });
      it("should not store image if no image is provided", async () => {
        const res = await request(server)
          .post("/images")
          .set("Authorization", "Bearer " + token1)
          .send({});
        expect(res.statusCode).toEqual(400);
      });
    });
  });
})