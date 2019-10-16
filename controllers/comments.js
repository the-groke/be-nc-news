const {
  selectCommentsByArticleId,
  updateComment,
  removeComment
} = require("../models/comments");

exports.getComments = (req, res, next) => {
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
  const id = req.params.article_id;
  const sortBy = req.query.sort_by;
  const order = req.query.order;

  selectCommentsByArticleId(id, sortBy, order)
    .then(comments => {
      authorToUsername = renameKeys(comments, "author", "username");
      res.status(200).send({ comments: authorToUsername });
    })
    .catch(next);
};

exports.patchComment = (req, res, next) => {
  const incVotes = req.body.inc_votes;
  const commentId = req.params.comment_id;
  console.log(commentId, incVotes);

  updateComment(commentId, incVotes)
    .then(comment => {
      console.log(comment);

      if (comment.length === 0) {
        return Promise.reject({ status: 404, msg: "comment does not exist" });
      } else {
        res.status(200).send({ comment });
      }
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const commentId = req.params.id;
  removeComment(commentId);
};
