const connection = require("../db/connection");

exports.selectCommentsByArticleId = (
  id,
  sortBy = "comments_id",
  order,
  author,
  topic
) => {
  return connection
    .select("*")
    .from("comments")
    .where("article_id", id)
    .orderBy(sortBy, order);
};

exports.updateComment = (commentsId, incVotes) => {
  return connection("comments")
    .where("comments.comments_id", "=", commentsId)
    .increment("votes", incVotes)
    .returning("*");
};
