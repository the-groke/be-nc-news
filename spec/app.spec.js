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

      it("responds with status 404 for valid but non-existant username", () => {
        return request(app)
          .get("/api/users/pizza")
          .expect(404);
      });
    });
  });
  describe("/articles", () => {
    describe("GET", () => {});
    it("responds with status 200 and an array of article objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0]).to.eql({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 100,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T12:21:54.171Z"
          });
        });
    });
    describe("/:article_id", () => {
      describe("GET", () => {
        it("responds with status 200 and requested article object", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(body.article.title).to.equal(
                "Living in the shadow of a great man"
              );
            });
        });
        it("articles object contains comment count", () => {
          return request(app)
            .get("/api/articles/1")
            .then(({ body }) => {});
        });
        it("responds with status 404 when requested non-existent valid article id ", () => {
          return request(app)
            .get("/api/articles/13")
            .expect(404);
        });
        it("responds with status 400 when requested invalid article id", () => {
          return request(app)
            .get("/api/articles/kjghlojgou")
            .expect(400);
        });
      });
      describe("PATCH", () => {});
      describe("/comments", () => {
        describe("POST", () => {});
        describe("GET", () => {
          it("responds with status 200 and array of comments", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .then(({ body }) => {
                expect(body.comments.length).to.equal(13);
              });
          });
          it("comments array is sorted by comment_id as a default and in ascending order", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.sortedBy("comments_id", {
                  descending: false
                });
              });
          });
          it("comments array is sorted by given column", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=created_at")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.sortedBy("created_at");
              });
          });
          it("comments array is sorted in descending order when passed desc as query", () => {
            return request(app)
              .get("/api/articles/1/comments?order=desc")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.sortedBy("comments_id", {
                  descending: true
                });
              });
          });
        });
      });
    });
  });
  describe("/comments", () => {
    describe("/:comment_id", () => {
      describe("PATCH", () => {});
      describe("DELETE", () => {});
    });
  });
});
