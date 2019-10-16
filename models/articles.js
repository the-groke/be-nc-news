const connection = require("../db/connection");

// exports.selectAllTopics = () => {
//   return connection.select("slug", "description").from("topics");
// };

exports.selectArticleById = articleId => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", articleId);
};

exports.selectAllArticles = (
  sortBy = "created_at",
  order = "desc",
  author,
  topic
) => {
  return connection
    .select("articles.*")
    .from("articles")
    .orderBy(sortBy, order)
    .modify(query => {
      if (author) query.where({ author });
      if (topic) query.where({ topic });
    });
};

exports.updateArticle = (articleId, incVotes) => {
  return connection("articles")
    .where("articles.article_id", "=", articleId)
    .increment("votes", incVotes)
    .returning("*");
};
