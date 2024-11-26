import Joi from 'joi';

export const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ 
            message: 'Validation failed', 
            errors: error.details.map((err) => err.message) 
        });
    }
    next();
};
