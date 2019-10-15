const { selectAllTopics } = require("../models/topics");

exports.getTopics = (req, res, next) => {
  return selectAllTopics()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(console.log);
};
