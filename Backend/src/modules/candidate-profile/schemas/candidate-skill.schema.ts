import Joi from 'joi';

// Schema Joi cho
const createCandidateSkillSchema = Joi.object({
  skillName: Joi.string().required().messages({
    'string.base': 'Tên kỹ năng phải là một chuỗi.',
    'string.empty': 'Tên kỹ năng không được để trống.',
    'any.required': 'Tên kỹ năng là bắt buộc.'
  })
});

export { createCandidateSkillSchema };
