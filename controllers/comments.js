const {
  selectCommentsByArticleId,
  updateComment,
  removeComment,
  insertComment
} = require("../models/comments");

const renameKeys = (arr, keyToChange, newKey) => {
  return arr.map(obj => {
    const newObj = {};
    for (let key in obj) {
      if (key === keyToChange) newObj[newKey] = obj[key];
      else newObj[key] = obj[key];
    }
    return newObj;
  });
};

exports.getComments = (req, res, next) => {
  const id = req.params.article_id;
  const { sort_by, order } = req.query;

  selectCommentsByArticleId(id, sort_by, order)
    .then(comments => {
      if (comments.length === 0)
        return Promise.reject({ status: 404, msg: "not found" });

      if (order) {
        if (order !== "asc" && order !== "desc")
          return Promise.reject({ status: 400, msg: "bad request" });
      }
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.patchComment = (req, res, next) => {
  const incVotes = req.body.inc_votes;
  const commentsId = req.params.comment_id;

  updateComment(commentsId, incVotes)
    .then(comment => {
      if (comment.length === 0) {
        return Promise.reject({ status: 404, msg: "comment does not exist" });
      } else {
        res.status(200).send({ comment });
      }
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const commentId = req.params.comment_id;
  removeComment(commentId)
    .then(comment => {
      if (comment === 0)
        return Promise.reject({ status: 404, msg: "not found" });

      res.status(204).send();
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const bodyClone = { ...req.body };
  const articleId = req.params.article_id;
  bodyClone.article_id = articleId;
  bodyClone2 = renameKeys([bodyClone], "username", "author");

  insertComment(...bodyClone2)
    .then(comment => {
      res.status(201).send({ comment: comment[0] });
    })
    .catch(next);
};
