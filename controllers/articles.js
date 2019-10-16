const {
  selectArticleById,
  selectAllArticles,
  updateArticle
} = require("../models/articles");

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
  const sortBy = req.query.sort_by;
  const order = req.query.order;
  selectAllArticles(sortBy, order)
    .then(articles => {
      if (articles.length === 0) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      } else res.status(200).send({ articles });
    })
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  const incVotes = req.body.inc_votes;
  const articleId = req.params.article_id;

  updateArticle(articleId, incVotes)
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      } else {
        res.status(200).send({ article });
      }
    })
    .catch(next);
};
