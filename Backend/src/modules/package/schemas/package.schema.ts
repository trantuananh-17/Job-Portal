import Joi from 'joi';

export const packageCreateSchema = Joi.object({
  label: Joi.string().required().messages({
    'any.required': 'Package label is required.',
    'string.base': 'Package label must be a string.'
  }),
  price: Joi.number().required().messages({
    'any.required': 'Price is required.',
    'number.base': 'Price must be a number.'
  }),
  jobPostLimit: Joi.number().required().messages({
    'any.required': 'Job post limit is required.',
    'number.base': 'Job post limit must be a number.'
  })
});

export const packageUpdateSchema = Joi.object({
  label: Joi.string().optional().messages({
    'string.base': 'Package label must be a string.'
  }),
  price: Joi.number().optional().messages({
    'number.base': 'Price must be a number.'
  }),
  jobPostLimit: Joi.number().optional().messages({
    'number.base': 'Job post limit must be a number.'
  })
});

export const packageUpdateActiveSchema = Joi.object({
  isActive: Joi.boolean().required().messages({
    'any.required': 'Active status is required.',
    'boolean.base': 'Active status must be a boolean.'
  })
});
