const connection = require("../db/connection");

exports.selectAllTopics = () => {
  return connection.select("slug", "description").from("topics");
};

exports.checkIfTopicExists = topic => {
  return connection
    .select("*")
    .from("topics")
    .where("slug", topic);
};
