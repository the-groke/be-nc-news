const connection = require("../db/connection");
const { selectUser } = require("../models/users");
const { checkIfTopicExists } = require("../models/topics");

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
  const articleQuery = connection
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
  const promises = [articleQuery];
  if (author) {
    const userQuery = selectUser(author).then(users => {
      if (!users.length) return Promise.reject({ code: "invalid_author" });
    });
    promises.push(userQuery);
  }
  if (topic) {
    const topicQuery = checkIfTopicExists(topic).then(topics => {
      if (!topics.length) return Promise.reject({ code: "invalid_topic" });
    });
    promises.push(topicQuery);
  }

  return Promise.all(promises)
    .then(response => {
      return response[0];
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

exports.updateArticle = (articleId, incVotes = 0) => {
  return connection("articles")
    .where("articles.article_id", "=", articleId)
    .increment("votes", incVotes)
    .returning("*");
};
