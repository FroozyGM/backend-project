const userSchema = {
  type: "object",
  required: ["name", "phone", "password"],
  properties: {
    _id: {
      type: "string",
      description: "Уникальный идентификатор пользователя",
    },
    name: {
      type: "string",
      description: "Имя пользователя",
      example: "Иван Иванов",
    },
    phone: {
      type: "string",
      description: "Номер телефона пользователя",
      example: "+79999999999",
      pattern: "^\\+7[0-9]{10}$",
    },
    password: {
      type: "string",
      description: "Хешированный пароль с использованием bcrypt.js",
      format: "password",
      writeOnly: true,
    },
    role: {
      type: "string",
      description: "Роль пользователя в системе",
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: "string",
      description: "URL аватара пользователя",
      nullable: true,
    },
    createdAt: {
      type: "string",
      format: "date-time",
      description: "Дата и время создания аккаунта",
    },
  },
};

export default userSchema;
