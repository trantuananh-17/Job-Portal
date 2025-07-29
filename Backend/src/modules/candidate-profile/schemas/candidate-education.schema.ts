import { Degree } from '@prisma/client';
import Joi from 'joi';

export const candidateEducationCreateSchema = Joi.object({
  educationId: Joi.number().required().messages({
    'any.required': 'Mã học vấn là bắt buộc.',
    'number.base': 'Mã học vấn phải là một số.'
  }),
  major: Joi.string().required().messages({
    'any.required': 'Ngành học là bắt buộc.',
    'string.base': 'Ngành học phải là một chuỗi ký tự.'
  }),
  degree: Joi.string()
    .valid(...Object.values(Degree))
    .required()
    .messages({
      'any.required': 'Bằng cấp là bắt buộc.',
      'string.base': 'Bằng cấp phải là một chuỗi ký tự.',
      'any.only': `Bằng cấp phải là một trong: ${Object.values(Degree).join(', ')}`
    }),
  yearStart: Joi.number().required().messages({
    'any.required': 'Năm bắt đầu là bắt buộc.',
    'number.base': 'Năm bắt đầu phải là một số.'
  }),
  yearEnd: Joi.number().required().messages({
    'any.required': 'Năm kết thúc là bắt buộc.',
    'number.base': 'Năm kết thúc phải là một số.'
  })
});

export const candidateEducationUpdateSchema = Joi.object({
  major: Joi.string().optional().messages({
    'string.base': 'Ngành học phải là một chuỗi ký tự.'
  }),
  degree: Joi.string().optional().messages({
    'string.base': 'Bằng cấp phải là một chuỗi ký tự.'
  }),
  yearStart: Joi.number().optional().messages({
    'number.base': 'Năm bắt đầu phải là một số.'
  }),
  yearEnd: Joi.number().optional().messages({
    'number.base': 'Năm kết thúc phải là một số.'
  })
});
