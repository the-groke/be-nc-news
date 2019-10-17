const connection = require("../db/connection");

// exports.selectAllTopics = () => {
//   return connection.select("slug", "description").from("topics");
// };

exports.selectArticleById = articleId => {
  return connection
    .select("articles.*")
    .count({ comment_count: "comments.article_id" })
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", "=", articleId);
};

exports.selectAllArticles = (
  sortBy = "created_at",
  order = "desc",
  author,
  topic
) => {
  return connection
    .select("articles.*")
    .count({ comment_count: "comments.article_id" })
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sortBy, order)
    .modify(query => {
      if (author) query.where("articles.author", "=", author);
      if (topic) query.where("articles.topic", "=", topic);
    });
};

exports.updateArticle = (articleId, incVotes) => {
  return connection("articles")
    .where("articles.article_id", "=", articleId)
    .increment("votes", incVotes)
    .returning("*");
};
