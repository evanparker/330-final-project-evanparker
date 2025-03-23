const request = require("supertest");

const server = require("../server");
const testUtils = require("../test-utils");

const User = require("../models/user");
const Image = require("../models/image");
const Manufacturer = require("../models/manufacturer");
const Figure = require("../models/figure");
const Invite = require("../models/invite");

describe("/figures", () => {
  beforeAll(testUtils.connectDB);
  afterAll(testUtils.stopDB);

  afterEach(testUtils.clearDB);

  const userNormal = {
    email: "userNormal@mail.com",
    username: "userNormal",
    password: "999password"
  };

  const image0 = {
    cloudinaryPublicId: "t1lqquh8o8pdnnaouphl"
  };
  const image1 = {
    cloudinaryPublicId: "zufzijos4ca2p5dpuxsu"
  };
  let images;
  let user;
  let exampleFigure;
  let exampleManufacturer;

  beforeEach(async () => {
    user = await User.create(userNormal);
    images = (
      await Image.insertMany([
        { ...image0, userId: user._id },
        { ...image1, userId: user._id }
      ])
    ).map((i) => i.toJSON());

    exampleManufacturer = await Manufacturer.create({
      images: [images[0]._id, images[1]._id],
      name: "Example Manufacturer"
    });
    exampleFigure = {
      images: [images[0]._id, images[1]._id],
      name: "Example",
      manufacturerId: exampleManufacturer._id
    };
  });

  describe("Before Login", () => {
    describe("GET /", () => {
      let figures = [];
      beforeEach(async () => {
        const figure1 = Figure.create({ name: "figure 1" });
        figures.push(figure1);
        const figure2 = Figure.create({
          name: "figure 2",
          manufacturerId: exampleManufacturer._id,
          images: [images[0]._id, images[1]._id]
        });
        figures.push(figure2);
      });

      it("should return 200 and all figures", async () => {
        const res = await request(server).get("/figures/").send();
        expect(res.statusCode).toEqual(200);
        res.body.forEach((figure, i) => {
          expect(figure).toMatchObject(figures[i]);
        });
      });
    });

    describe("GET /:id", () => {
      let figures = [];
      beforeEach(async () => {
        const figure1 = await Figure.create({
          name: "figure 1",
          images: [images[0]._id, images[1]._id]
        });
        figures.push(figure1);
        const figure2 = await Figure.create({
          name: "figure 2",
          manufacturerId: exampleManufacturer._id,
          images: [images[0]._id, images[1]._id]
        });
        figures.push(figure2);
        const figure3 = await Figure.create({
          name: "figure 3",
          manufacturerId: exampleManufacturer._id
        });
        figures.push(figure3);
      });

      it("should return 200 a specific figure with images and manufacturer object", async () => {
        const res1 = await request(server)
          .get("/figures/" + figures[0]._id)
          .send();
        expect(res1.statusCode).toEqual(200);
        expect(res1.body).toMatchObject({
          name: "figure 1",
          images: [image0, image1]
        });

        const res2 = await request(server)
          .get("/figures/" + figures[1]._id)
          .send();
        expect(res2.statusCode).toEqual(200);
        expect(res2.body).toMatchObject({
          name: "figure 2",
          manufacturer: {
            _id: exampleManufacturer._id.toString(),
            images: [images[0]._id.toString(), images[1]._id.toString()],
            name: "Example Manufacturer"
          },
          images: [image0, image1]
        });

        const res3 = await request(server)
          .get("/figures/" + figures[2]._id)
          .send();
        expect(res3.statusCode).toEqual(200);
        expect(res3.body).toMatchObject({
          name: "figure 3",
          manufacturer: {
            _id: exampleManufacturer._id.toString(),
            images: [images[0]._id.toString(), images[1]._id.toString()],
            name: "Example Manufacturer"
          }
        });
      });
    });
  });

  describe("After Login", () => {
    const invite0 = {
      code: "code0"
    }
    const invite1 = {
      code: "code1"
    }
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
      await Invite.create(invite0);
      await Invite.create(invite1);
      await request(server).post("/auth/signup").send({...user0, invite: invite0.code});
      const res0 = await request(server).post("/auth/login").send(user0);
      token0 = res0.body.token;
      userId0 = res0.body.userId;

      await request(server).post("/auth/signup").send({...user1, invite: invite1.code});
      await User.updateOne(
        { email: user1.email },
        { $push: { roles: "admin" } }
      );
      const res1 = await request(server).post("/auth/login").send(user1);
      adminToken = res1.body.token;
      adminId = res1.body.userId;
    });

    describe("POST /", () => {
      it("should send a 403 when not admin", async () => {
        const res = await request(server)
          .post("/figures")
          .set("Authorization", "Bearer " + token0)
          .send(exampleFigure);
        expect(res.statusCode).toEqual(403);
      });

      it("should send a 400 when create fails", async () => {
        const res = await request(server)
          .post("/figures")
          .set("Authorization", "Bearer " + adminToken)
          .send({});
        expect(res.statusCode).toEqual(400);
      });

      it("should send a 200 and create a figure when admin", async () => {
        const res = await request(server)
          .post("/figures")
          .set("Authorization", "Bearer " + adminToken)
          .send(exampleFigure);
        expect(res.statusCode).toEqual(200);
        const storeFigure = await testUtils.findOne(Figure, {});
        expect(storeFigure).toMatchObject(exampleFigure);
      });
    });

    describe("PUT /:id", () => {
      beforeEach(async () => {
        await Figure.create({
          name: "figure 1"
        });
      });

      it("should send a 403 when not admin", async () => {
        const storedFigure = await testUtils.findOne(Figure, {});
        const res = await request(server)
          .put("/figures/" + storedFigure._id)
          .set("Authorization", "Bearer " + token0)
          .send(exampleFigure);
        expect(res.statusCode).toEqual(403);
      });

      it("should send a 200 and update when admin", async () => {
        const storedFigure = await testUtils.findOne(Figure, {});
        const res = await request(server)
          .put("/figures/" + storedFigure._id)
          .set("Authorization", "Bearer " + adminToken)
          .send(exampleFigure);
        expect(res.statusCode).toEqual(200);
        const storedFigure1 = await testUtils.findOne(Figure, {});
        expect(storedFigure1).toMatchObject(exampleFigure);
      });
    });
  });
});
