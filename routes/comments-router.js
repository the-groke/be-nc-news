const commentsRouter = require("express").Router();
const { patchComment, deleteComment } = require("../controllers/comments");

commentsRouter.route("/:comment_id").patch(patchComment);
commentsRouter.route("/:comment_id").delete(deleteComment);

module.exports = commentsRouter;
