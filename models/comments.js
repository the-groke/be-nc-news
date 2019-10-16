const connection = require("../db/connection");

exports.selectCommentsByArticleId = (id, sortBy = "comments_id") => {
  return connection
    .select("*")
    .from("comments")
    .where("article_id", id)
    .orderBy(sortBy);
};
