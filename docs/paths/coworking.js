const coworkingPaths = {
  "/api/coworkings": {
    get: {
      summary: "Получить список всех коворкингов",
      tags: ["Коворкинги"],
      parameters: [
        {
          name: "page",
          in: "query",
          schema: {
            type: "integer",
            default: 1,
          },
          description: "Номер страницы",
        },
        {
          name: "limit",
          in: "query",
          schema: {
            type: "integer",
            default: 10,
          },
          description: "Количество записей на странице",
        },
      ],
      responses: {
        200: {
          description: "Успешное получение списка коворкингов",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Coworking",
                    },
                  },
                  total: {
                    type: "integer",
                  },
                  page: {
                    type: "integer",
                  },
                  limit: {
                    type: "integer",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/coworkings/{id}": {
    get: {
      summary: "Получить детали коворкинга по ID",
      tags: ["Коворкинги"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID коворкинга",
        },
      ],
      responses: {
        200: {
          description: "Успешное получение деталей коворкинга",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Coworking",
              },
            },
          },
        },
        404: {
          description: "Коворкинг не найден",
        },
      },
    },
  },
  "/api/coworkings/{id}/book": {
    post: {
      summary: "Забронировать коворкинг",
      tags: ["Коворкинги"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "ID коворкинга",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["startDate", "endDate"],
              properties: {
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
          description: "Коворкинг успешно забронирован",
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
        404: {
          description: "Коворкинг не найден",
        },
        409: {
          description: "Коворкинг уже забронирован на это время",
        },
      },
    },
  },
};

export default coworkingPaths;
