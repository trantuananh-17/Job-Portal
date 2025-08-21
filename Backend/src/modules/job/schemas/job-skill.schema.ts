import Joi from 'joi';

export const jobSkillSchema = Joi.object({
  jobId: Joi.number().integer().required().messages({
    'number.base': 'jobId must be an integer.',
    'any.required': 'jobId is a required field.'
  }),
  skillName: Joi.string().required().messages({
    'string.base': 'skillName must be a string.',
    'any.required': 'skillName is a required field.'
  })
});
