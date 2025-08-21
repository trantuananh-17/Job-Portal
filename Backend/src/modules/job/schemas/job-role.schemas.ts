import Joi from 'joi';

export const jobRoleCreateSchema = Joi.object({
  name: Joi.string().required().empty().messages({
    'any.required': 'Name is required.',
    'string.base': 'Name must be a string.',
    'string.empty': 'Name is empty.'
  })
});
