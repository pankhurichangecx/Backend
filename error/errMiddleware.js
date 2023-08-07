const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
  
    // Check if the error is a custom error with a specific status code
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
  
    // If the error does not have a specific status code, assume it's a 500 error
    return res.status(500).json({ error: "Internal Server Error" });
  };
  
  module.exports = errorMiddleware;