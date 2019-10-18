const connection = require("../db/connection");

// exports.selectAllTopics = () => {
//   return connection.select("slug", "description").from("topics");
// };

exports.selectUser = username => {
  return connection
    .select("*")
    .from("users")
    .where("username", username);
};

exports.checkIfUserexists = username => {
  return connection;
};
