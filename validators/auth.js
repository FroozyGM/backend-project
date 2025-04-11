import { check, validationResult } from "express-validator";

export const registerValidator = [
  check("name", "Имя обязательно").not().isEmpty(),
  check("phone", "Введите корректный номер телефона").not().isEmpty(),
  check("password", "Пароль должен быть минимум 6 символов").isLength({
    min: 6,
  }),
];

export const loginValidator = [
  check("phone", "Введите корректный номер телефона").not().isEmpty(),
  check("password", "Введите пароль").exists(),
];

export const ownerValidator = [
  check("name", "Имя обязательно").not().isEmpty(),
  check("phone", "Введите корректный номер телефона").not().isEmpty(),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
