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

exports.selectAllArticles = () => {
  return connection.select("*").from("articles");
};
