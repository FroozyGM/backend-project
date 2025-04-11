const coworkingSchema = {
  type: "object",
  required: ["name", "address", "description", "price"],
  properties: {
    _id: {
      type: "string",
      description: "Уникальный идентификатор коворкинга",
    },
    name: {
      type: "string",
      description: "Название коворкинга",
      example: "IT Space",
    },
    address: {
      type: "string",
      description: "Адрес коворкинга",
      example: "г. Москва, ул. Пушкина, д. 10",
    },
    description: {
      type: "string",
      description: "Описание коворкинга",
      example:
        "Современный коворкинг с панорамными окнами и всем необходимым для продуктивной работы",
    },
    price: {
      type: "number",
      description: "Стоимость аренды коворкинга за день",
      example: 1000,
    },
    capacity: {
      type: "integer",
      description: "Вместимость коворкинга (количество рабочих мест)",
      example: 20,
    },
    amenities: {
      type: "array",
      description: "Список удобств и сервисов",
      items: {
        type: "string",
        enum: [
          "wifi",
          "kitchen",
          "printer",
          "meeting_room",
          "parking",
          "coffee",
        ],
      },
      example: ["wifi", "kitchen", "coffee"],
    },
    image: {
      type: "string",
      description: "URL изображения коворкинга",
      example: "https://example.com/images/coworking1.jpg",
    },
    rating: {
      type: "number",
      description: "Средний рейтинг коворкинга",
      minimum: 0,
      maximum: 5,
      example: 4.7,
    },
    createdAt: {
      type: "string",
      format: "date-time",
      description: "Дата и время добавления коворкинга в систему",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      description: "Дата и время последнего обновления информации о коворкинге",
    },
  },
};

export default coworkingSchema;
