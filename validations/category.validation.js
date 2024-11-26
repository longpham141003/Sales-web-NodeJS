import Joi from 'joi';

export const createCategorySchema = Joi.object({
    categoryId: Joi.string().required().messages({
        'string.base': 'Category ID phải là chuỗi',
        'any.required': 'Category ID là bắt buộc'
    }),
    name: Joi.string().required().messages({
        'string.base': 'Tên danh mục phải là chuỗi',
        'any.required': 'Tên danh mục là bắt buộc'
    }),
    image: Joi.string().uri().required().messages({
        'string.base': 'Image phải là chuỗi URL',
        'any.required': 'Hình ảnh là bắt buộc',
        'string.uri': 'Image phải là một URL hợp lệ'
    })
});
