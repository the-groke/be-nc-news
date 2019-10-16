const { selectCommentsByArticleId } = require("../models/comments");

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
