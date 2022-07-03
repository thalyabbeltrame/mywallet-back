import Joi from 'joi';

const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  passwordConfirmation: Joi.string().valid(Joi.ref('password')).required(),
});

export default signUpSchema;
