import Joi from 'joi';

export const authSignUpSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Tên không được để trống',
    'any.required': 'Tên phải tồn tại'
  }),
  email: Joi.string().required().messages({
    'string.empty': 'Email không được để trống',
    'any.required': 'Email phải tồn tại'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Mật khẩu không được để trống',
    'any.required': 'Mật khẩu phải tồn tại'
  })
});
