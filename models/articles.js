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

exports.selectAllArticles = (sortBy = "created_at", order = "desc") => {
  return connection
    .select("*")
    .from("articles")
    .orderBy(sortBy, order);
};

exports.updateArticle = (articleId, incVotes) => {
  return connection("articles")
    .where("articles.article_id", "=", articleId)
    .increment("votes", incVotes)
    .returning("*");
};
