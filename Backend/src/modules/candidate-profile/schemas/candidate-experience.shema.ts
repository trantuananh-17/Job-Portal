import Joi from 'joi';

export const candidateExperienceCreateSchema = Joi.object({
  company: Joi.string().required().messages({
    'string.base': 'Company should be a type of string',
    'any.required': 'Company is a required field'
  }),
  department: Joi.string().required().messages({
    'string.base': 'Department should be a type of string',
    'any.required': 'Department is a required field'
  }),
  startDate: Joi.string().isoDate().required().messages({
    'string.base': 'Start Date should be a type of string',
    'string.isoDate': 'Start Date must be a valid ISO date',
    'any.required': 'Start Date is a required field'
  }),
  endDate: Joi.string().isoDate().optional().messages({
    'string.base': 'End Date should be a type of string',
    'string.isoDate': 'End Date must be a valid ISO date'
  }),
  responsibilities: Joi.string().required().messages({
    'string.base': 'Responsibilities should be a type of string',
    'any.required': 'Responsibilities is a required field'
  })
});

export const candidateExperienceUpdateSchema = Joi.object({
  company: Joi.string().optional().messages({
    'string.base': 'Company should be a type of string'
  }),
  department: Joi.string().optional().messages({
    'string.base': 'Department should be a type of string'
  }),
  startDate: Joi.string().isoDate().optional().messages({
    'string.base': 'Start Date should be a type of string',
    'string.isoDate': 'Start Date must be a valid ISO date'
  }),
  endDate: Joi.string().isoDate().optional().messages({
    'string.base': 'End Date should be a type of string',
    'string.isoDate': 'End Date must be a valid ISO date'
  }),
  responsibilities: Joi.string().optional().messages({
    'string.base': 'Responsibilities should be a type of string'
  })
});
