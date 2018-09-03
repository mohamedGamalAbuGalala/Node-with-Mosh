module.exports.asyncMiddleware = handler => {
  return async (req, res, next) => {
    try {
      // some code..
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
};
