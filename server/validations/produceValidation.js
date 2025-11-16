import Joi from 'joi';

export const produceSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  images: Joi.array().items(Joi.string().uri()).min(1).required(),
  price: Joi.number().min(0).required(),
  quantity: Joi.number().min(0).required(),
  unit: Joi.string().required(),
  category: Joi.string().required(),
  location: Joi.string().required(),
});

// For updates, all fields are optional
export const updateProduceSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  images: Joi.array().items(Joi.string().uri()).min(1),
  price: Joi.number().min(0),
  quantity: Joi.number().min(0),
  unit: Joi.string(),
  category: Joi.string(),
  location: Joi.string(),
  status: Joi.string().valid('Available', 'Sold Out', 'Pending'),
});