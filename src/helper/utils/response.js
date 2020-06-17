
const buildRes = (res, success, data) => {
  if (success) {
    return res.status(200).json({
      success,
      data,
    });
  }
  return res.json({
    success,
    message: data,
  });
};

module.exports = {
  buildRes,
};
