import Joi from 'joi';

export const jobBenefitSchema = Joi.object({
  jobId: Joi.number().integer().required().messages({
    'number.base': 'jobId must be an integer.',
    'any.required': 'jobId is a required field.'
  }),
  benefitName: Joi.string().required().messages({
    'string.base': 'benefitName must be a string.',
    'any.required': 'benefitName is a required field.'
  })
});
