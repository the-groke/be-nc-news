const articlesRouter = require("express").Router();
const {
  getArticle,
  getArticles,
  patchArticle
} = require("../controllers/articles");
const { getComments, postComment } = require("../controllers/comments");
const { handle405s } = require("../errors");

articlesRouter
  .route("/")
  .get(getArticles)
  .all(handle405s);
articlesRouter
  .route("/:article_id")
  .get(getArticle)
  .patch(patchArticle)
  .all(handle405s);
articlesRouter
  .route("/:article_id/comments")
  .get(getComments)
  .post(postComment)
  .all(handle405s);

module.exports = articlesRouter;
