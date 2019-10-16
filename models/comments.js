const connection = require("../db/connection");

exports.selectCommentsByArticleId = id => {
  return connection
    .select("*")
    .from("comments")
    .where("article_id", id);
};
