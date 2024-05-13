export const unless = function (middleware, ...paths) {
  return function (req, res, next) {
    const pathCheck = paths.some((path) => path === req.path);
    pathCheck ? next() : middleware(req, res, next);
  };
};

export const getDateCode = (date) => {
  return date.getFullYear() + date.getMonth() + date.getDate();
};

export const calculateDiscount = (discount, amount) => {
  return amount ? amount - (amount * discount) / 100 : 0;
};

export const calculateTax = (grossAmount) => {
  const taxPercentage = 18;
  return grossAmount ? (grossAmount * taxPercentage) / 100 : 0;
};

export function padDigits(number, digits) {
  return (
    Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number
  );
}
