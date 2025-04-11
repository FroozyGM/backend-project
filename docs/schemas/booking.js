const bookingSchema = {
  type: "object",
  required: ["user", "coworking", "startDate", "endDate"],
  properties: {
    _id: {
      type: "string",
      description: "Уникальный идентификатор бронирования",
    },
    user: {
      type: "string",
      description: "Идентификатор пользователя, создавшего бронирование",
      example: "61701d91d5d7520b230d5442",
    },
    coworking: {
      type: "string",
      description: "Идентификатор забронированного коворкинга",
      example: "61701d91d5d7520b230d5443",
    },
    startDate: {
      type: "string",
      format: "date",
      description: "Дата начала бронирования",
      example: "2023-06-01",
    },
    endDate: {
      type: "string",
      format: "date",
      description: "Дата окончания бронирования",
      example: "2023-06-05",
    },
    status: {
      type: "string",
      enum: ["pending", "confirmed", "cancelled"],
      description: "Статус бронирования",
      default: "pending",
    },
    totalPrice: {
      type: "number",
      description: "Общая стоимость бронирования",
      example: 5000,
    },
    createdAt: {
      type: "string",
      format: "date-time",
      description: "Дата и время создания бронирования",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      description: "Дата и время последнего обновления бронирования",
    },
  },
};

export default bookingSchema;
