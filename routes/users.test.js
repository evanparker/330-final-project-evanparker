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
  const userOther = {
    email: "userOther@mail.com",
    username: "userOther",
    password: "777password"
  };

  const image0 = {
    cloudinaryCloudName: "ddl3gn9nh",
    cloudinaryPublicId: "t1lqquh8o8pdnnaouphl"
  };
  const image1 = {
    cloudinaryCloudName: "ddl3gn9nh",
    cloudinaryPublicId: "zufzijos4ca2p5dpuxsu"
  };
  let images;
  let user, user1;
  let minis = [];

  beforeEach(async () => {
    user = await User.create(userNormal);
    user1 = await User.create(userOther);
    images = (
      await Image.insertMany([
        { ...image0, userId: user._id },
        { ...image1, userId: user._id }
      ])
    ).map((i) => i.toJSON());
    const miniTemplate = {
      userId: user._id,
      images: [images[0]._id, images[1]._id]
    };
    for (let i = 0; i < 3; i++) {
      const mini = await Mini.create(miniTemplate);
      minis.push(mini);
    }
    await Mini.create({ ...miniTemplate, userId: user1._id });
  });

  describe("GET /:id/minis", () => {
    it("should return 200 and all a user's minis", async () => {
      const res = await request(server)
        .get("/users/" + user.username + "/minis")
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBe(3);
    });
    it("should return 404 for a bad id", async () => {
      const res = await request(server)
        .get("/users/" + "nouser" + "/minis")
        .send();
      expect(res.statusCode).toEqual(404);
    });
  });
});
