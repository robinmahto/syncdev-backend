import Joi from "joi";

export const userValidation = Joi.object({
  firstName: Joi.string().required().min(3).max(50),
  lastName: Joi.string().required().min(3).max(50),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {
      allow: ["com", "in", "net"],
    },
  }),
  password: Joi.string().required(),
  imageURL: Joi.string().optional(),
  role: Joi.string().optional(),
  bio: Joi.string().optional(),
  age: Joi.number().optional(),
  gender: Joi.string().optional(),
});
