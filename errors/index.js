exports.handle400s = (err, req, res, next) => {
  const codes = ["23502", "42703", "22P02"];
  if (codes.includes(err.code) || err.status === 400) {
    res.status(400).send({ msg: "bad request" });
  } else {
    next(err);
  }
};

exports.handle404s = (err, req, res, next) => {
  const codes = ["42703"];
  if (codes.includes(err.code) || err.status === 404) {
    res.status(404).send({ msg: "not found" });
  } else {
    next(err);
  }
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: "method not allowed" });
};

exports.handle500s = (err, req, res, next) => {
  res.status(500).send({ msg: "internal server error!" });
};
