import Joi from 'joi';

const userRulers = {
  hoTen: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Zàáảãạăắẳẵặâấẩẫậêếểễệôốổỗộơớởỡợúùủũụưứừửữựíìỉĩịđ\s]+$/)
    .messages({
      'string.empty': 'Họ tên không được để trống',
      'string.min': 'Họ tên phải chứa ít nhất 2 ký tự',
      'string.max': 'Họ tên chỉ được chứa tối đa 50 ký tự',
      'string.pattern.base': 'Họ tên chỉ được chứa chữ cái và khoảng trắng',
    }),
  email: Joi.string()
    .email({ tlds: { allow: ['com', 'net', 'org'] } })
    .pattern(/@/)
    .messages({
      'string.email': 'Email không hợp lệ',
      'string.empty': 'Email không được để trống',
      'string.pattern.base': 'Email phải chứa ký tự "@"',
    }),
  soDienThoai: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({
      'string.empty': 'Số điện thoại không được để trống',
      'string.pattern.base': 'Số điện thoại phải có đúng 10 chữ số',
    }),
  username: Joi.string()
    .min(4)
    .max(20)
    .pattern(/^[a-zA-Z0-9._-]+$/)
    .messages({
      'string.empty': 'Tên người dùng không được để trống',
      'string.min': 'Tên người dùng phải có ít nhất 4 ký tự',
      'string.max': 'Tên người dùng không được vượt quá 20 ký tự',
      'string.pattern.base': 'Tên người dùng chỉ được chứa chữ cái, số, dấu chấm, gạch dưới và gạch nối',
    }),
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]{6,}$/)
    .messages({
      'string.empty': 'Mật khẩu không được để trống',
      'string.min': 'Mật khẩu phải có ít nhất 6 ký tự',
      'string.pattern.base': 'Mật khẩu phải chứa ít nhất một chữ cái in hoa, một chữ cái in thường, một số và một ký tự đặc biệt',
    }),
  role: Joi.string()
    .valid('user', 'admin')
    .messages({
      'any.only': 'Vai trò chỉ được là user hoặc admin',
      'string.empty': 'Vai trò không được để trống',
    }),
};

export const registerSchema = Joi.object({
  hoTen: userRulers.hoTen.required(),
  email: userRulers.email.required(),
  soDienThoai: userRulers.soDienThoai.required(),
  username: userRulers.username.required(),
  password: userRulers.password.required(),
  role: userRulers.role.default('user'),
});

export const loginSchema = Joi.object({
  username: userRulers.username.required(),
  password: userRulers.password.required(),
});

export const createUserSchema = Joi.object({
  hoTen: userRulers.hoTen.required(),
  email: userRulers.email.required(),
  soDienThoai: userRulers.soDienThoai.required(),
  username: userRulers.username.required(),
  password: userRulers.password.required(),
  role: userRulers.role.required(),
});

export const updateUserInfoSchema = Joi.object({
  hoTen: userRulers.hoTen.required(),
  email: userRulers.email.required(),
  soDienThoai: userRulers.soDienThoai.required(),
});
