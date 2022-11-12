const { ForbiddenError } = require('@casl/ability');
const { HttpError } = require('http-errors');

function toJSON(err, options = {}) {
  const { stack, ...object } = typeof err.toJSON === 'function'
    ? err.toJSON()
    : { message: err.message, stack: err.stack };

  if (options.withStack) {
    object.stack = stack;
  }

  return object;
}

module.exports = function errorHandler(error, req, res, next) { // eslint-disable-line

  // ถ้ามี error ของ casl ให้ส่ง 403
  if (error instanceof ForbiddenError) {
    return res.status(403).send({
      status: 'forbidden',
      message: error.message
    });
  }

   // ถ้ามี error ของ http กำหนดค่าเป็น error code แต่ถ้าไม่มีให้ค่า error เป็น 500
  let statusCode = error instanceof HttpError ? error.statusCode : 500;

  if (error.errors) {
    statusCode = 400;
  }

  // ส่ง error code ออกไป
  res.status(statusCode).send(toJSON(error, {
    withStack: req.app.get('env') === 'development'
  }));
};
