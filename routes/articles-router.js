const articlesRouter = require("express").Router();
const {
  getArticle,
  getArticles,
  patchArticle
} = require("../controllers/articles");
const { getComments, postComment } = require("../controllers/comments");

articlesRouter.route("/").get(getArticles);
articlesRouter.route("/:article_id").get(getArticle);
articlesRouter.route("/:article_id").patch(patchArticle);
articlesRouter.route("/:article_id/comments").get(getComments);
articlesRouter.route("/:article_id/comments").post(postComment);

module.exports = articlesRouter;
