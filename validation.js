// validation
const Joi = require("@hapi/joi");

// Register Validation
const registerValidation = (obj) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const validation = schema.validate(obj);
  return validation;
};

// Login Validation
const loginValidation = (obj) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  const validation = schema.validate(obj);
  return validation;
};

module.exports = { registerValidation, loginValidation };
