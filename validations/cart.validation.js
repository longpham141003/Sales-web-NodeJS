import Joi from 'joi';

export const addToCartSchema = Joi.object({
    product: Joi.string().length(24).required().messages({
        'string.base': 'Product phải là chuỗi',
        'string.length': 'Product ID phải dài 24 ký tự',
        'any.required': 'Product là bắt buộc'
    }),
    quantity: Joi.number().positive().min(1).required().messages({
        'number.base': 'Số lượng phải là một số',
        'number.min': 'Số lượng phải lớn hơn 0',
        'any.required': 'Số lượng là bắt buộc'
    }),
    totalPrice: Joi.number().positive().required().messages({
        'number.base': 'Giá trị sản phẩm phải là một số',
        'number.positive': 'Giá trị sản phẩm phải lớn hơn 0',
        'any.required': 'Giá trị sản phẩm là bắt buộc'
    })
});

export const updateCartSchema = Joi.object({
    product: Joi.string().length(24).required().messages({
        'string.base': 'Product phải là chuỗi',
        'string.length': 'Product ID phải dài 24 ký tự',
        'any.required': 'Product là bắt buộc'
    }),
    quantity: Joi.number().positive().min(1).required().messages({
        'number.base': 'Số lượng phải là một số',
        'number.min': 'Số lượng phải lớn hơn 0',
        'any.required': 'Số lượng là bắt buộc'
    }),
    totalPrice: Joi.number().positive().required().messages({
        'number.base': 'Giá trị sản phẩm phải là một số',
        'number.positive': 'Giá trị sản phẩm phải lớn hơn 0',
        'any.required': 'Giá trị sản phẩm là bắt buộc'
    })
});
