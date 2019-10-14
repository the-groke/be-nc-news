exports.formatDates = list => {
  return list.map(obj => {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(obj.created_at);

    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    let formattedDateAndTime = `${year}-${month + 1}-${day} ${hours -
      1}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
    let newObj = { ...obj };
    newObj.created_at = formattedDateAndTime;
    return newObj;
  });
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
