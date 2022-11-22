const createError = require('http-errors');

const validations = {
  pathParameters: id => validate({ item: id, error: { status: 'BadRequest', msg: 'missing id' } }),
  apiKey: API_KEY => validate({ item: API_KEY, error: { status: 'Unauthorized', msg: 'no value for API_KEY' } }),
  contract: (id, contract) => validate({ item: contract, error: { status: 'NotFound', msg: id } })
};
module.exports = { validate: validations };

const validate = ({ item, error: { status, msg } }) => {
  const errors = {
    Unauthorized: createError.Unauthorized,
    NotFound: createError.NotFound,
    BadRequest: createError.BadRequest
  };
  if (!item || item.length === 0) {
    throw new Error(errors[status](msg));
  }
  return item;
};
