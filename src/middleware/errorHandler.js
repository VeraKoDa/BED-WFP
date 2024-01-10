const errorHandler = (err, req, res, next) => {
  if (err.name === "NotFoundError") {
    res.status(404).json({
      message: err.message,
    });
    return;
  }
  if (err.name === "InvalidCredentialsError" || err.statusCode === 401) {
    res.status(401).json({
      type: err.name,
      message: err.message,
    });
    return;
  }
  if (err.name === "InternalServerError") {
    res.status(500).json({
      message: err.message,
    });
    return;
  } else {
    if (err.statusCode === 401) {
      res.status(401).json({
        type: err.name,
        message: err,
      });
      return;
    }
    res.status(400).json({
      type: err.name,
      message: err.message,
    });
  }
};

export default errorHandler;
