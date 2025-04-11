const userPaths = {
  "/api/users/profile": {
    get: {
      summary: "Получить профиль пользователя",
      tags: ["Пользователи"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Профиль пользователя получен успешно",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        401: {
          description: "Неавторизован",
        },
      },
    },
    put: {
      summary: "Обновить профиль пользователя",
      tags: ["Пользователи"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Профиль пользователя обновлен успешно",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        401: {
          description: "Неавторизован",
        },
      },
    },
  },
  "/api/users/bookings": {
    get: {
      summary: "Получить историю бронирований пользователя",
      tags: ["Пользователи"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "История бронирований получена успешно",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Booking",
                },
              },
            },
          },
        },
        401: {
          description: "Неавторизован",
        },
      },
    },
  },
  "/api/users/current-bookings": {
    get: {
      summary: "Получить текущие бронирования пользователя",
      tags: ["Пользователи"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Текущие бронирования получены успешно",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Booking",
                },
              },
            },
          },
        },
        401: {
          description: "Неавторизован",
        },
      },
    },
  },
  "/api/users/bookings/{bookingId}": {
    delete: {
      summary: "Удалить бронирование пользователя",
      tags: ["Пользователи"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "bookingId",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID бронирования",
        },
      ],
      responses: {
        200: {
          description: "Бронирование удалено успешно",
        },
        401: {
          description: "Неавторизован",
        },
        404: {
          description: "Бронирование не найдено",
        },
      },
    },
  },
};

export default userPaths;
