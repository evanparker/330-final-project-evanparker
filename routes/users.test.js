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

  const image0 = { image: "http://example.com/image0.jpg" };
  const image1 = { image: "http://example.com/image1.jpg" };
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
        .get("/users/" + user._id + "/minis")
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBe(3);
    });
  });
});
