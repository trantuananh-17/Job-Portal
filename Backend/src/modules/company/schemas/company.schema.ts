import Joi from 'joi';

export const companyCreateSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  teamSize: Joi.number().required(),
  establishmentDate: Joi.string().isoDate().required(),
  websiteUrl: Joi.string().required(),
  mapLink: Joi.string().required(),
  address: Joi.string().required()
});

export const companyUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  teamSize: Joi.number().optional(),
  establishmentDate: Joi.string().isoDate().optional(),
  websiteUrl: Joi.string().optional(),
  mapLink: Joi.string().optional(),
  address: Joi.string().optional()
});

export const companyApprovedSchema = Joi.object({
  isApproved: Joi.boolean().required()
});
