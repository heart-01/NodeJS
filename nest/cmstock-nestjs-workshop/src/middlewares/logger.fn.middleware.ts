// ใช้ middleware แบบ function
export const loggerFunctionMiddleware = (req, res, next) => {
  console.log('logger ip: ', req.ip);
  next();
};
