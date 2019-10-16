const articlesRouter = require("express").Router();
const { getArticle, getArticles } = require("../controllers/articles");

articlesRouter.route("/").get(getArticles);
articlesRouter.route("/:article_id").get(getArticle);

module.exports = articlesRouter;
