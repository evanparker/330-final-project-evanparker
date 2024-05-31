const request = require("supertest");

const server = require("../server");
const testUtils = require("../test-utils");

const User = require("../models/user");
const Image = require("../models/image");
const Mini = require("../models/mini");

describe("/minis", () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(testUtils.clearDB);

  const userNormal = {
    email: "userNormal@mail.com",
    username: "userNormal",
    password: "999password"
  };

  const image0 = { image: "http://example.com/image0.jpg" };
  const image1 = { image: "http://example.com/image1.jpg" };
  let images;
  let user;
  let exampleMini;

  beforeEach(async () => {
    user = await User.create(userNormal);
    images = (
      await Image.insertMany([
        { ...image0, userId: user._id },
        { ...image1, userId: user._id }
      ])
    ).map((i) => i.toJSON());
    exampleMini = {
      images: [images[0]._id, images[1]._id]
    };
  });

  describe("Before login", () => {
    describe("POST /", () => {
      it("should send 401 without a token", async () => {
        const res = await request(server).post("/minis").send(exampleMini);
        expect(res.statusCode).toEqual(401);
      });
      it("should send 401 with a bad token", async () => {
        const res = await request(server)
          .post("/minis")
          .set("Authorization", "Bearer BAD")
          .send(exampleMini);
        expect(res.statusCode).toEqual(401);
      });
    });

    describe("PUT /:id", () => {
      let miniId;
      beforeEach(async () => {
        const minis = await Mini.insertMany([
          { ...exampleMini, userId: user._id }
        ]);
        miniId = minis[0]._id;
      });
      it("should send 401 without a token", async () => {
        const res = await request(server)
          .put("/minis/" + miniId)
          .send({
            images: [images[1]._id, images[0]._id]
          });
        expect(res.statusCode).toEqual(401);
      });
      it("should send 401 with a bad token", async () => {
        const res = await request(server)
          .put("/minis/" + miniId)
          .set("Authorization", "Bearer BAD")
          .send({
            images: [images[1]._id, images[0]._id]
          });
        expect(res.statusCode).toEqual(401);
      });
    });

    describe("DELETE /:id", () => {
      let miniId;
      beforeEach(async () => {
        const minis = await Mini.insertMany([
          { ...exampleMini, userId: user._id }
        ]);
        miniId = minis[0]._id;
      });
      it("should send 401 without a token", async () => {
        const res = await request(server)
          .delete("/minis/" + miniId)
          .send();
        expect(res.statusCode).toEqual(401);
      });
      it("should send 401 with a bad token", async () => {
        const res = await request(server)
          .delete("/minis/" + miniId)
          .set("Authorization", "Bearer BAD")
          .send();
        expect(res.statusCode).toEqual(401);
      });
    });
  });

  describe("after login", () => {
    const user0 = {
      email: "user0@mail.com",
      username: "user0",
      password: "123password"
    };
    const user1 = {
      email: "user1@mail.com",
      username: "user1",
      password: "456password"
    };
    let token0;
    let adminToken;
    let userId0;
    let adminId;
    beforeEach(async () => {
      await request(server).post("/auth/signup").send(user0);
      const res0 = await request(server).post("/auth/login").send(user0);
      token0 = res0.body.token;
      userId0 = res0.body.userId;
      await request(server).post("/auth/signup").send(user1);
      await User.updateOne(
        { email: user1.email },
        { $push: { roles: "admin" } }
      );
      const res1 = await request(server).post("/auth/login").send(user1);
      adminToken = res1.body.token;
      adminId = res1.body.userId;
    });

    describe("POST /", () => {
      it("should send 200 to normal user and create mini", async () => {
        const res = await request(server)
          .post("/minis")
          .set("Authorization", "Bearer " + token0)
          .send(exampleMini);
        expect(res.statusCode).toEqual(200);
        const storedMini = await Mini.findOne().lean();
        expect(storedMini).toMatchObject({
          ...exampleMini,
          userId: (await User.findOne({ email: user0.email }).lean())._id
        });
      });
      it("should send 400 with a bad image _id", async () => {
        const res = await request(server)
          .post("/minis")
          .set("Authorization", "Bearer " + token0)
          .send({ images: [images[1]._id, "5f1b8d9ca0ef055e6e5a1f6b"] });
        expect(res.statusCode).toEqual(400);
        const storedMini = await Mini.findOne().lean();
        expect(storedMini).toBeNull();
      });
    });

    describe("GET /:id", () => {
      let mini0Id, mini1Id;
      beforeEach(async () => {
        const res0 = await request(server)
          .post("/minis")
          .set("Authorization", "Bearer " + token0)
          .send({ images: [images[0], images[1]].map((i) => i._id) });
        mini0Id = res0.body._id;
        const res1 = await request(server)
          .post("/minis")
          .set("Authorization", "Bearer " + adminToken)
          .send({ images: [images[0]].map((i) => i._id) });
        mini1Id = res1.body._id;
      });
      it("should send 200 for a mini", async () => {
        const res = await request(server)
          .get("/minis/" + mini0Id)
          .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({
          images: [image0, image1],
          userId: (await User.findOne({ email: user0.email }))._id.toString()
        });
      });
    });

    describe("GET /", () => {
      let minis = [];
      beforeEach(async () => {
        const res0 = await request(server)
          .post("/minis")
          .set("Authorization", "Bearer " + token0)
          .send({ images: [images[0], images[1]].map((i) => i._id) });
        minis.push(res0.body);
        const res1 = await request(server)
          .post("/minis")
          .set("Authorization", "Bearer " + adminToken)
          .send({ images: [images[0]].map((i) => i._id) });
        minis.push(res1.body);
      });

      it("should return 200 and all minis", async () => {
        const res = await request(server).get("/minis/").send();
        expect(res.statusCode).toEqual(200);
        res.body.forEach((mini, i) => {
          expect(mini).toMatchObject(minis[i]);
        });
      });
    });

    describe("PUT /:id", () => {
      let miniId0, miniId1;
      beforeEach(async () => {
        const minis = await Mini.insertMany([
          { ...exampleMini, userId: userId0 },
          { ...exampleMini, userId: adminId }
        ]);
        miniId0 = minis[0]._id;
        miniId1 = minis[1]._id;
      });
      it("a user should update their mini", async () => {
        const res = await request(server)
          .put("/minis/" + miniId0)
          .set("Authorization", "Bearer " + token0)
          .send({
            images: [images[1]._id, images[0]._id]
          });
        expect(res.statusCode).toEqual(200);
        const mini = await Mini.findOne({ _id: miniId0 });
        expect(mini).toMatchObject({
          images: [images[1]._id, images[0]._id]
        });
      });
      it("a user should not be able to update someone else's mini", async () => {
        const res = await request(server)
          .put("/minis/" + miniId1)
          .set("Authorization", "Bearer " + token0)
          .send({
            images: [images[1]._id, images[0]._id]
          });
        expect(res.statusCode).toEqual(401);
      });
      it("an admin should update someone else's mini", async () => {
        const res = await request(server)
          .put("/minis/" + miniId0)
          .set("Authorization", "Bearer " + adminToken)
          .send({
            images: [images[1]._id, images[0]._id]
          });
        expect(res.statusCode).toEqual(200);
        const mini = await Mini.findOne({ _id: miniId0 });
        expect(mini).toMatchObject({
          images: [images[1]._id, images[0]._id]
        });
      });
    });

    describe("DELETE /:id", () => {
      let miniId0, miniId1;
      beforeEach(async () => {
        const minis = await Mini.insertMany([
          { ...exampleMini, userId: userId0 },
          { ...exampleMini, userId: adminId }
        ]);
        miniId0 = minis[0]._id;
        miniId1 = minis[1]._id;
      });
      it("a user should delete their mini", async () => {
        const res = await request(server)
          .delete("/minis/" + miniId0)
          .set("Authorization", "Bearer " + token0)
          .send({
            images: [images[1]._id, images[0]._id]
          });
        expect(res.statusCode).toEqual(200);
        const mini = await Mini.findOne({ _id: miniId0 });
        expect(mini).toBeNull();
      });
      it("a user should not be able to delete someone else's mini", async () => {
        const res = await request(server)
          .delete("/minis/" + miniId1)
          .set("Authorization", "Bearer " + token0)
          .send({
            images: [images[1]._id, images[0]._id]
          });
        expect(res.statusCode).toEqual(401);
        const mini = await Mini.findOne({ _id: miniId1 });
        expect(mini).not.toBeNull();
      });
      it("an admin should delete someone else's mini", async () => {
        const res = await request(server)
          .delete("/minis/" + miniId0)
          .set("Authorization", "Bearer " + adminToken)
          .send({
            images: [images[1]._id, images[0]._id]
          });
        expect(res.statusCode).toEqual(200);
        const mini = await Mini.findOne({ _id: miniId0 });
        expect(mini).toBeNull();
      });
    });
  });
});
