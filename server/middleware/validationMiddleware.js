import Joi from 'joi';

// A middleware to validate the request body against a Joi schema
const validateRequest = (schema) => {
  return (req, res, next) => {
    // Joi validation options
    const options = {
      abortEarly: false, // Include all errors
      allowUnknown: true, // Ignore unknown props
      stripUnknown: true, // Remove unknown props
    };

    // Validate the request body
    const { error, value } = schema.validate(req.body, options);

    if (error) {
      // If validation fails, send a 400 response with the error details
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ');
      return res.status(400).json({ message: `Validation failed: ${errorMessage}` });
    }

    // If validation succeeds, replace req.body with the validated (and stripped) value
    req.body = value;
    next();
  };
};

export default validateRequest;