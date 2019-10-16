const articlesRouter = require("express").Router();
const {
  getArticle,
  getArticles,
  patchArticle
} = require("../controllers/articles");
const { getComments } = require("../controllers/comments");

articlesRouter.route("/").get(getArticles);
articlesRouter.route("/:article_id").get(getArticle);
articlesRouter.route("/:article_id").patch(patchArticle);
articlesRouter.route("/:article_id/comments").get(getComments);

module.exports = articlesRouter;
