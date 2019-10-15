process.env.NODE_ENV = "test";
const app = require("../app");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-sorted"));
const request = require("supertest");
const connection = require("../db/connection");

beforeEach(() => connection.seed.run());
after(() => connection.destroy());

describe("/api", () => {
  it("returns 404 when given invalid url", () => {
    return request(app)
      .get("/api/kjshdfgids")
      .expect(404);
  });
  describe("/topics", () => {
    describe("GET", () => {
      it("responds with status 200 and array of topic objects", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            expect(body.topics).to.eql([
              {
                description: "The man, the Mitch, the legend",
                slug: "mitch"
              },
              {
                description: "Not dogs",
                slug: "cats"
              },
              {
                description: "what books are made of",
                slug: "paper"
              }
            ]);
          });
      });
    });
  });
  describe("/users", () => {
    describe("/:username", () => {
      it("responds with status 200 and requested user object", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(({ body }) => {
            expect(body.user).to.eql({
              username: "butter_bridge",
              name: "jonny",
              avatar_url:
                "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
            });
          });
      });
      it("responds with status 400 for invalid username", () => {
        console.log("?");
      });
      it("responds with status 404 for valid but non-existant username", () => {
        return request(app).get("/api/users/");
      });
    });
  });
  describe("/articles", () => {
    describe("GET", () => {});
    describe("/:article_id", () => {
      describe("GET", () => {});
      describe("PATCH", () => {});
      describe("/comments", () => {});
    });
  });
  describe("/comments", () => {
    describe("POST", () => {});
    describe("GET", () => {});
    describe("/:comment_id", () => {
      describe("PATCH", () => {});
      describe("DELETE", () => {});
    });
  });
});
