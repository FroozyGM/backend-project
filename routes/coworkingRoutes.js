import express from "express";
import coworkingController from "../controllers/coworkingController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", coworkingController.getAllCoworkings);
router.get("/:id", coworkingController.getCoworkingDetails);
router.post("/:id/book", auth, coworkingController.bookCoworking);

export default router;
