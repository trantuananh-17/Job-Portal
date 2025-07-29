import Joi from 'joi';

export const candidateLanguageCreateSchema = Joi.object({
  languageName: Joi.string().required().messages({
    'string.base': 'Tên ngôn ngữ phải là một chuỗi.',
    'string.empty': 'Tên ngôn ngữ không được để trống.',
    'any.required': 'Tên ngôn ngữ là bắt buộc.'
  }),
  level: Joi.string().required().messages({
    'string.base': 'Cấp độ phải là một chuỗi.',
    'string.empty': 'Cấp độ không được để trống.',
    'any.required': 'Cấp độ là bắt buộc.'
  })
});

export const candidateLanguageUpdateSchema = Joi.object({
  level: Joi.string().required().messages({
    'string.base': 'Cấp độ phải là một chuỗi.',
    'string.empty': 'Cấp độ không được để trống.',
    'any.required': 'Cấp độ là bắt buộc.'
  })
});
