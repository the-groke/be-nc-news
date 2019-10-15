const { selectUser } = require("../models/users");

exports.getUser = (req, res, next) => {
  selectUser(req.params.username)
    .then(user => {
      res.status(200).send({ user: user[0] });
    })
    .catch(console.log);
};
