module.exports.getErrorMessages = error => {
  return error.details.reduce((ret, el) => {
    ret.push({
      message: el.message.replace(/\"/g, ``),
      context: el.context.key
    });
    return ret;
  }, []);
};
