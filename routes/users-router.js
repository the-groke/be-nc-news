const usersRouter = require("express").Router();
const { getUser } = require("../controllers/users");
const { handle405s } = require("../errors");

usersRouter
  .route("/:username")
  .get(getUser)
  .all(handle405s);

module.exports = usersRouter;
