import Joi from 'joi';
import { ApplyStatus } from '@prisma/client';

const updateStatusApplySchema = Joi.object({
  candidateProfileId: Joi.number().integer().required().messages({
    'number.base': 'candidateProfileId phải là số.',
    'any.required': 'candidateProfileId là bắt buộc.'
  }),

  jobId: Joi.number().integer().required().messages({
    'number.base': 'jobId phải là số.',
    'any.required': 'jobId là bắt buộc.'
  }),

  status: Joi.string()
    .valid(...Object.values(ApplyStatus))
    .required()
    .messages({
      'string.base': 'Trạng thái phải là một chuỗi.',
      'any.only': `Trạng thái chỉ được phép là một trong các giá trị: ${Object.values(ApplyStatus).join(', ')}.`,
      'any.required': 'Trạng thái là bắt buộc.'
    })
});

export { updateStatusApplySchema };
