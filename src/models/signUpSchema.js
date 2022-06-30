import Joi from 'joi';

const signUpSchema = Joi.object({
  name: Joi.string().alphanum().min(1).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  passwordConfirmation: Joi.ref('password'),
});

export { signUpSchema };
