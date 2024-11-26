import Joi from 'joi';

export const addToWishlistSchema = Joi.object({
    productId: Joi.string().length(24).required().messages({
        'string.base': 'Product ID phải là chuỗi',
        'string.length': 'Product ID phải dài 24 ký tự',
        'any.required': 'Product ID là bắt buộc'
    })
});
