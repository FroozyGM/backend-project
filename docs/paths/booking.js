const bookingPaths = {
  "/api/bookings": {
    get: {
      summary: "Получить все бронирования",
      tags: ["Бронирования"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Список бронирований получен успешно",
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
    post: {
      summary: "Создать новое бронирование",
      tags: ["Бронирования"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["coworking", "startDate", "endDate"],
              properties: {
                coworking: {
                  type: "string",
                  description: "ID коворкинга",
                },
                startDate: {
                  type: "string",
                  format: "date",
                  description: "Дата начала бронирования",
                },
                endDate: {
                  type: "string",
                  format: "date",
                  description: "Дата окончания бронирования",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Бронирование создано успешно",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Booking",
              },
            },
          },
        },
        400: {
          description: "Неверные данные бронирования",
        },
        401: {
          description: "Неавторизован",
        },
        409: {
          description: "Коворкинг уже забронирован на это время",
        },
      },
    },
  },
  "/api/bookings/user": {
    get: {
      summary: "Получить все бронирования пользователя",
      tags: ["Бронирования"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Список бронирований пользователя получен успешно",
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
  "/api/bookings/{id}/cancel": {
    patch: {
      summary: "Отменить бронирование",
      tags: ["Бронирования"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
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
          description: "Бронирование успешно отменено",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Booking",
              },
            },
          },
        },
        401: {
          description: "Неавторизован",
        },
        403: {
          description: "Нет прав на отмену этого бронирования",
        },
        404: {
          description: "Бронирование не найдено",
        },
      },
    },
  },
};

export default bookingPaths;
