const connection = require("../db/connection");

exports.selectCommentsByArticleId = (
  id,
  sortBy = "created_at",
  order = "desc"
) => {
  return connection
    .select("author", "body", "comment_id", "created_at", "votes")
    .from("comments")
    .where("article_id", id)
    .orderBy(sortBy, order);
};

exports.updateComment = (commentsId, incVotes) => {
  return connection("comments")
    .where("comments.comment_id", "=", commentsId)
    .increment("votes", incVotes)
    .returning("*");
};

exports.removeComment = commentsId => {
  return connection("comments")
    .where("comment_id", commentsId)
    .del();
};
exports.insertComment = body => {
  return connection
    .insert(body)
    .into("comments")
    .returning("*");
};
