exports.formatDates = list => {
  return list.map(obj => {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.

    let newObj = { ...obj };
    newObj.created_at = new Date(obj.created_at);
    return newObj;
  });
};

exports.makeRefObj = list => {
  refObj = {};
  for (let i = 0; i < list.length; i++) {
    refObj[list[i].title] = list[i].article_id;
  }
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
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
  const changedTitles = renameKeys(comments, "belongs_to", "article_id");
  const formattedDates = exports.formatDates(changedTitles);
  return formattedDates.map(comment => {
    comment.article_id = refObj[comment.article_id];
    return comment;
  });
};
