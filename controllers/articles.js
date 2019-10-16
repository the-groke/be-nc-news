const { selectArticleById, selectAllArticles } = require("../models/articles");

exports.getArticle = (req, res, next) => {
  selectArticleById(req.params.article_id)
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      } else res.status(200).send({ article: article[0] });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  selectAllArticles()
    .then(articles => {
      if (articles.length === 0) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      } else res.status(200).send({ articles });
    })
    .catch(next);
};
