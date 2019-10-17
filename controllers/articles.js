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
  const author = req.query.author;
  const topic = req.query.topic;

  validQueries = ["sort_by", "order", "author", "topic"];

  // if (req.query) {
  //   for (let i = 0; i < Object.keys(req.query).length; i++) {
  //     if (!validQueries.includes(Object.keys(req.query)[i])) {
  //       Promise.reject({ status: 400, msg: "bad request" });
  //     }
  //   }
  // }

  selectAllArticles(sortBy, order, author, topic)
    .then(articles => {
      if (order) {
        if (order !== "asc" && order !== "desc")
          return Promise.reject({ status: 400, msg: "bad request" });
      }
      // if (req.query) console.log(req.query);

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
      if (req.body && !incVotes) {
        return Promise.reject({ status: 400, msg: "bad request" });
      }

      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "article does not exist" });
      } else {
        res.status(200).send({ article });
      }
    })
    .catch(next);
};
