import Joi from 'joi';

export const jobCreateSchema = Joi.object({
  companyId: Joi.number().required().messages({
    'any.required': 'Company ID is required',
    'number.base': 'Company ID must be a number'
  }),
  title: Joi.string().required().messages({
    'any.required': 'Title is required',
    'string.base': 'Title must be a string'
  }),
  description: Joi.string().required().messages({
    'any.required': 'Description is required',
    'string.base': 'Description must be a string'
  }),
  minSalary: Joi.number().required().messages({
    'any.required': 'Minimum salary is required',
    'number.base': 'Minimum salary must be a number'
  }),
  maxSalary: Joi.number().required().messages({
    'any.required': 'Maximum salary is required',
    'number.base': 'Maximum salary must be a number'
  }),
  jobRoleName: Joi.string().required().messages({
    'any.required': 'Job role name is required',
    'string.base': 'Job role name must be a string'
  })
});

export const jobUpdateSchema = Joi.object({
  title: Joi.string().optional().messages({
    'string.base': 'Title must be a string'
  }),
  jobRoleName: Joi.string().optional().messages({
    'string.base': 'Job role name must be a string'
  }),
  description: Joi.string().optional().messages({
    'string.base': 'Description must be a string'
  }),
  minSalary: Joi.number().optional().messages({
    'number.base': 'Minimum salary must be a number'
  }),
  maxSalary: Joi.number().optional().messages({
    'number.base': 'Maximum salary must be a number'
  })
});
