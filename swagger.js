import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// Swagger schemas
import userSchema from "./docs/schemas/user.js";
import bookingSchema from "./docs/schemas/booking.js";
import coworkingSchema from "./docs/schemas/coworking.js";
// Swagger paths
import authPaths from "./docs/paths/auth.js";
import userPaths from "./docs/paths/user.js";
import coworkingPaths from "./docs/paths/coworking.js";
import bookingPaths from "./docs/paths/booking.js";

const swaggerDoc = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Coworking API",
      version: "1.0.0",
      description: "API для сервиса бронирования коворкингов",
    },
    components: {
      schemas: {
        User: userSchema,
        Booking: bookingSchema,
        Coworking: coworkingSchema,
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    paths: {
      ...authPaths,
      ...userPaths,
      ...coworkingPaths,
      ...bookingPaths,
    },
    tags: [
      {
        name: "Авторизация",
        description: "Операции, связанные с авторизацией и регистрацией",
      },
      {
        name: "Пользователи",
        description: "Операции над пользователями",
      },
      {
        name: "Коворкинги",
        description: "Операции над коворкингами",
      },
      {
        name: "Бронирования",
        description: "Операции над бронированиями",
      },
    ],
  },
  apis: [],
});

export function setupSwagger(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}
