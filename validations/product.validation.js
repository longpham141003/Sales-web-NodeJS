import Joi from 'joi';

export const createProductSchema = Joi.object({
    category: Joi.string().length(24).required().messages({
        'string.base': 'Category phải là chuỗi',
        'string.length': 'Category ID phải dài 24 ký tự',
        'any.required': 'Category là bắt buộc'
    }),
    name: Joi.string().min(3).max(255).required().messages({
        'string.base': 'Tên sản phẩm phải là chuỗi',
        'string.min': 'Tên sản phẩm phải có ít nhất 3 ký tự',
        'string.max': 'Tên sản phẩm không được vượt quá 255 ký tự',
        'any.required': 'Tên sản phẩm là bắt buộc'
    }),
    description: Joi.string().min(10).required().messages({
        'string.base': 'Mô tả phải là chuỗi',
        'string.min': 'Mô tả phải có ít nhất 10 ký tự',
        'any.required': 'Mô tả sản phẩm là bắt buộc'
    }),
    oldPrice: Joi.number().positive().optional().messages({
        'number.base': 'Giá cũ phải là một số',
        'number.positive': 'Giá cũ phải lớn hơn 0'
    }),
    newPrice: Joi.number().positive().required().messages({
        'number.base': 'Giá mới phải là một số',
        'number.positive': 'Giá mới phải lớn hơn 0',
        'any.required': 'Giá mới là bắt buộc'
    }),
    images: Joi.array().items(Joi.string().uri()).messages({
        'array.base': 'Hình ảnh phải là một mảng các URL',
        'string.uri': 'Hình ảnh phải là URL hợp lệ'
    })
});
