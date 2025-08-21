import Joi from 'joi';

export const companyCreateSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Company name is required.',
    'string.base': 'Company name must be a string.'
  }),
  description: Joi.string().required().messages({
    'any.required': 'Description is required.',
    'string.base': 'Description must be a string.'
  }),
  teamSize: Joi.number().required().messages({
    'any.required': 'Team size is required.',
    'number.base': 'Team size must be a number.'
  }),
  establishmentDate: Joi.string().isoDate().required().messages({
    'any.required': 'Establishment date is required.',
    'string.isoDate': 'Establishment date must be a valid ISO date (YYYY-MM-DD).',
    'string.base': 'Establishment date must be a string.'
  }),
  websiteUrl: Joi.string().required().messages({
    'any.required': 'Website URL is required.',
    'string.base': 'Website URL must be a string.'
  }),
  mapLink: Joi.string().required().messages({
    'any.required': 'Map link is required.',
    'string.base': 'Map link must be a string.'
  }),
  address: Joi.string().required().messages({
    'any.required': 'Address is required.',
    'string.base': 'Address must be a string.'
  })
});

export const companyUpdateSchema = Joi.object({
  name: Joi.string().optional().messages({
    'string.base': 'Company name must be a string.'
  }),
  description: Joi.string().optional().messages({
    'string.base': 'Description must be a string.'
  }),
  teamSize: Joi.number().optional().messages({
    'number.base': 'Team size must be a number.'
  }),
  establishmentDate: Joi.string().isoDate().optional().messages({
    'string.isoDate': 'Establishment date must be a valid ISO date (YYYY-MM-DD).',
    'string.base': 'Establishment date must be a string.'
  }),
  websiteUrl: Joi.string().optional().messages({
    'string.base': 'Website URL must be a string.'
  }),
  mapLink: Joi.string().optional().messages({
    'string.base': 'Map link must be a string.'
  }),
  address: Joi.string().optional().messages({
    'string.base': 'Address must be a string.'
  })
});

export const companyApprovedSchema = Joi.object({
  isApproved: Joi.boolean().required().messages({
    'any.required': 'Approval status is required.',
    'boolean.base': 'Approval status must be a boolean.'
  })
});
