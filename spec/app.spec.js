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
    describe("GET", () => {
      describe(":)", () => {
        it("responds with status 200 and an array of article objects", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.length).to.equal(12);
            });
        });
        it("responds with an array of article objects which contain a comment_count key", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body: { articles } }) => {
              for (let i = 0; i < articles.length; i++) {
                expect(articles[i]).to.contain.keys("comment_count");
              }
            });
        });
        it("comment count has value of number of comments on each article", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body: { articles } }) => {
              expect(articles[0].comment_count).to.equal("13");
            });
        });
        it("articles array is sorted by date as a default and in descending order", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.be.sortedBy("created_at", {
                descending: true
              });
            });
        });
        it("articles array is sorted by given column", () => {
          return request(app)
            .get("/api/articles?sort_by=body")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.be.sortedBy("body", {
                descending: true
              });
            });
        });
        it("articles array is sorted in descending order when passed desc as query", () => {
          return request(app)
            .get("/api/articles?order=asc")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.be.sortedBy("created_at", {
                descending: false
              });
            });
        });
        it("articles array contains only those by given author in query", () => {
          return request(app)
            .get("/api/articles?author=icellusedkars")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.length).to.equal(6);
            });
        });
        it("articles array contains only those by given topic in query", () => {
          return request(app)
            .get("/api/articles?topic=cats")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles.length).to.equal(1);
            });
        });
      });
      describe(":(", () => {
        it("responds with 404 when sorted by invalid column", () => {
          return request(app)
            .get("/api/articles?sort_by=pizza")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("bad request");
            });
        });
        it("responds with 400 when given invalid order query", () => {
          return request(app)
            .get("/api/articles?order=pizza")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("bad request");
            });
        });
        it("responds with 404 when given non-existant author", () => {
          return request(app)
            .get("/api/articles?author=steve")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("not found");
            });
        });
        it("responds with 404 when given non-existant topic", () => {
          return request(app)
            .get("/api/articles?topic=steve")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("not found");
            });
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
              expect(body.article).to.contain.keys(
                "article_id",
                "title",
                "body",
                "votes",
                "topic",
                "author",
                "created_at"
              );
            });
        });
        it("article object contains comment count", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.contain.keys("comment_count");
            });
        });
        it("comment count has value of number of comments on article", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(body.article.comment_count).to.equal("13");
            });
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
      describe("PATCH", () => {
        it("responds with 200 and updated article", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 1 })
            .expect(200)
            .then(({ body: { article } }) => {
              expect(article[0].votes).to.equal(101);
            });
        });
        it("responds with 404 when attempting to update non-existant article", () => {
          return request(app)
            .patch("/api/articles/100")
            .send({ inc_votes: 1 })
            .expect(404);
        });
        it("responds with 400 when not given integer", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: "hello" })
            .expect(400);
        });
        it("reponds with 400 when given non-existing column", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ pizza: 1 })
            .expect(400);
        });
        it("responds with 400 when given empty object in body", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({})
            .expect(400);
        });
      });
      describe("/comments", () => {
        describe("POST", () => {
          it("returns status 201 and added comment", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ username: "rogersop", body: "hello" })
              .expect(201)
              .then(({ body }) => {
                expect(body.comment).to.contain.keys(
                  "author",
                  "body",
                  "comments_id",
                  "created_at",
                  "votes",
                  "article_id"
                );
              });
          });
          it("returns status 400 when given comment not formatted correctly", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ pizza: "rogersop", body: "hello" })
              .expect(400);
          });
          it("", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({
                username: "rogersop",
                body: "hello",
                pizza: "margherita"
              })
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("bad request");
              });
          });
          it("responds with status 400 when posting to correctly formatted article id that doesn't exist", () => {
            return request(app)
              .post("/api/articles/99/comments")
              .send({
                username: "rogersop",
                body: "hello",
                pizza: "margherita"
              })
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("bad request");
              });
          });
          it("responds with status 400 when not given enough data", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({})
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("bad request");
              });
          });
        });
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
          it("responds with 404 when sorted by invalid column", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=pizza")
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("bad request");
              });
          });
          it("responds with 400 when given invalid order query", () => {
            return request(app)
              .get("/api/articles/1/comments?order=pizza")
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("bad request");
              });
          });
        });
      });
    });
  });
  describe("/comments", () => {
    describe("/:comment_id", () => {
      describe("PATCH", () => {
        it("responds with status 200 and updated comment", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 1 })
            .expect(200)
            .then(({ body: { comment } }) => {
              expect(comment[0].votes).to.equal(17);
            });
        });
        it("responds with 404 when attempting to update non-existant comment", () => {
          return request(app)
            .patch("/api/comments/100")
            .send({ inc_votes: 1 })
            .expect(404);
        });
        it("responds with 400 when not given integer", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: "hello" })
            .expect(400);
        });
        it("reponds with 400 when given non-existing column", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ pizza: 1 })
            .expect(400);
        });
        it("responds with 400 when given empty object in body", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({})
            .expect(400);
        });
      });
      describe("DELETE", () => {
        it("responds with status 204", () => {
          return request(app)
            .delete("/api/comments/1")
            .expect(204);
        });
        it("responds with status 404 when trying to delete non-existing comment", () => {
          it("responds with status 204", () => {
            return request(app)
              .delete("/api/comments/100")
              .expect(404);
          });
        });
      });
    });
  });
});
