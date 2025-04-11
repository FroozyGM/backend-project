const authPaths = {
  "/api/auth/register": {
    post: {
      tags: ["Авторизация"],
      summary: "Регистрация нового пользователя",
      description: "Создание нового пользователя в системе",
      operationId: "registerUser",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "phone", "password"],
              properties: {
                name: {
                  type: "string",
                  example: "Иван Иванов",
                },
                phone: {
                  type: "string",
                  example: "+79999999999",
                },
                password: {
                  type: "string",
                  format: "password",
                  example: "securePassword123",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Пользователь успешно зарегистрирован",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: {
                    $ref: "#/components/schemas/User",
                  },
                  token: {
                    type: "string",
                    description: "JWT токен для авторизации",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Ошибка валидации данных",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example:
                      "Пользователь с таким номером телефона уже существует",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/auth/login": {
    post: {
      tags: ["Авторизация"],
      summary: "Вход пользователя в систему",
      description:
        "Авторизация существующего пользователя и получение JWT токена",
      operationId: "loginUser",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["phone", "password"],
              properties: {
                phone: {
                  type: "string",
                  example: "+79999999999",
                },
                password: {
                  type: "string",
                  format: "password",
                  example: "securePassword123",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Пользователь успешно авторизован",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: {
                    $ref: "#/components/schemas/User",
                  },
                  token: {
                    type: "string",
                    description: "JWT токен для авторизации",
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Неверные учетные данные",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Неверный номер телефона или пароль",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/auth/logout": {
    post: {
      tags: ["Авторизация"],
      summary: "Выход пользователя из системы",
      description: "Завершение сессии пользователя и инвалидация токена",
      operationId: "logoutUser",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Пользователь успешно вышел из системы",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Успешный выход из системы",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Пользователь не авторизован",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Требуется авторизация",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default authPaths;
