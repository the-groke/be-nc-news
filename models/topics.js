const connection = require("../db/connection");

exports.selectAllTopics = () => {
  return connection.select("slug", "description").from("topics");
};
