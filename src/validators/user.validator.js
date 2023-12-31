import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().min(4).required(),
    emailId: Joi.string().email().required(),
    passWord: Joi.string().min(6).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    req.validatedBody = value;
    next();
  }
};
