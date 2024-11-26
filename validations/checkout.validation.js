// validators/checkoutValidation.js
import Joi from 'joi';

export const checkoutSchema = Joi.object({
    receiverName: Joi.string().min(3).required().messages({
        'string.base': 'Tên người nhận phải là chuỗi',
        'string.min': 'Tên người nhận phải có ít nhất 3 ký tự',
        'any.required': 'Tên người nhận là bắt buộc'
    }),
    phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/).required().messages({
        'string.base': 'Số điện thoại phải là chuỗi',
        'string.pattern.base': 'Số điện thoại không hợp lệ',
        'any.required': 'Số điện thoại là bắt buộc'
    }),
    address: Joi.string().required().messages({
        'string.base': 'Địa chỉ phải là chuỗi',
        'any.required': 'Địa chỉ là bắt buộc'
    }),
    ward: Joi.string().required().messages({
        'string.base': 'Phường xã phải là chuỗi',
        'any.required': 'Phường xã là bắt buộc'
    }),
    district: Joi.string().required().messages({
        'string.base': 'Quận huyện phải là chuỗi',
        'any.required': 'Quận huyện là bắt buộc'
    }),
    province: Joi.string().required().messages({
        'string.base': 'Tỉnh thành phải là chuỗi',
        'any.required': 'Tỉnh thành là bắt buộc'
    }),
    totalAmount: Joi.number().positive().required().messages({
        'number.base': 'Số tiền phải là một số',
        'number.positive': 'Số tiền phải lớn hơn 0',
        'any.required': 'Số tiền là bắt buộc'
    }),
    products: Joi.array().items(Joi.object({
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
    })).required().messages({
        'array.base': 'Sản phẩm phải là mảng',
        'any.required': 'Danh sách sản phẩm là bắt buộc'
    })
});

export const updateCheckoutSchema = Joi.object({
    status: Joi.string().valid('Pending', 'Completed', 'Canceled').required().messages({
        'string.base': 'Trạng thái phải là chuỗi',
        'any.required': 'Trạng thái là bắt buộc'
    }),
    receiverName: Joi.string().min(3).optional().messages({
        'string.base': 'Tên người nhận phải là chuỗi',
        'string.min': 'Tên người nhận phải có ít nhất 3 ký tự'
    }),
    phoneNumber: Joi.string().pattern(/^[0-9]{10,15}$/).optional().messages({
        'string.base': 'Số điện thoại phải là chuỗi',
        'string.pattern.base': 'Số điện thoại không hợp lệ'
    }),
    address: Joi.string().optional().messages({
        'string.base': 'Địa chỉ phải là chuỗi'
    }),
    ward: Joi.string().optional().messages({
        'string.base': 'Phường xã phải là chuỗi'
    }),
    district: Joi.string().optional().messages({
        'string.base': 'Quận huyện phải là chuỗi'
    }),
    province: Joi.string().optional().messages({
        'string.base': 'Tỉnh thành phải là chuỗi'
    })
});
