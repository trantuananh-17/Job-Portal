import Joi from 'joi';

export const companyIndustrySchema = Joi.object({
  industryName: Joi.string().trim().required().messages({
    'string.base': 'Industry name must be a string.',
    'string.empty': 'Industry name is required.',
    'any.required': 'Industry name is required.'
  })
});
