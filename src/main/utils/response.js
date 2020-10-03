
const buildRes = (res, success, data) => {
  if (success) {
    return res.status(200).json({
      success,
      data,
    });
  }
  console.error(data);
  return res.json({
    success,
    message: data,
  });
};

module.exports = {
  buildRes,
};
