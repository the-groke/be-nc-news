const { selectUser } = require("../models/users");

exports.getUser = (req, res, next) => {
  selectUser(req.params.username)
    .then(user => {
      if (user.length === 0) {
        return Promise.reject({ status: 404, msg: "user does not exist" });
      } else res.status(200).send({ user: user[0] });
    })
    .catch(next);
};
