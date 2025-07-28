import { Gender } from '@prisma/client';
import Joi from 'joi';

export const candidateProfileCreateSchema = Joi.object({
  fullname: Joi.string().required().messages({
    'string.base': 'Họ và tên phải là chuỗi ký tự',
    'string.empty': 'Họ và tên không được để trống',
    'any.required': 'Họ và tên là bắt buộc'
  }),

  gender: Joi.string()
    .valid(...Object.values(Gender))
    .required()
    .messages({
      'string.base': 'Giới tính phải là chuỗi ký tự',
      'any.only': `Giới tính phải là một trong: ${Object.values(Gender).join(', ')}`,
      'any.required': 'Giới tính là bắt buộc'
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.base': 'Số điện thoại phải là chuỗi ký tự',
      'string.empty': 'Số điện thoại không được để trống',
      'string.pattern.base': 'Số điện thoại phải gồm 10 chữ số',
      'any.required': 'Số điện thoại là bắt buộc'
    }),

  cv: Joi.string().uri().required().messages({
    'string.base': 'CV phải là chuỗi',
    'string.uri': 'CV phải là một đường dẫn hợp lệ',
    'any.required': 'CV là bắt buộc'
  }),

  dateofbirth: Joi.string().isoDate().required().messages({
    'string.base': 'Ngày sinh phải là chuỗi ký tự',
    'string.isoDate': 'Ngày sinh phải theo định dạng ISO (YYYY-MM-DD)',
    'any.required': 'Ngày sinh là bắt buộc'
  }),

  address: Joi.string().required().messages({
    'string.base': 'Địa chỉ phải là chuỗi ký tự',
    'string.empty': 'Địa chỉ không được để trống',
    'any.required': 'Địa chỉ là bắt buộc'
  })
});

export const candidateProfileUpdateSchema = Joi.object({
  fullname: Joi.string().optional().messages({
    'string.base': 'Họ và tên phải là chuỗi ký tự',
    'string.empty': 'Họ và tên không được để trống'
  }),

  gender: Joi.string()
    .valid(...Object.values(Gender))
    .optional()
    .messages({
      'string.base': 'Giới tính phải là chuỗi ký tự',
      'any.only': `Giới tính phải là một trong: ${Object.values(Gender).join(', ')}`
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10,11}$/)
    .optional()
    .messages({
      'string.base': 'Số điện thoại phải là chuỗi ký tự',
      'string.empty': 'Số điện thoại không được để trống',
      'string.pattern.base': 'Số điện thoại phải gồm 10-11 chữ số'
    }),

  cv: Joi.string().uri().optional().messages({
    'string.base': 'CV phải là chuỗi',
    'string.uri': 'CV phải là một đường dẫn hợp lệ'
  }),

  dateofbirth: Joi.string().isoDate().optional().messages({
    'string.base': 'Ngày sinh phải là chuỗi ký tự',
    'string.isoDate': 'Ngày sinh phải theo định dạng ISO (YYYY-MM-DD)'
  }),

  address: Joi.string().optional().messages({
    'string.base': 'Địa chỉ phải là chuỗi ký tự',
    'string.empty': 'Địa chỉ không được để trống'
  })
});
