import express from "express";
import bookingController from "../controllers/bookingController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.use(auth);


router.post("/", bookingController.createBooking);
router.get("/user", bookingController.getUserBookings);
router.patch("/:id/cancel", bookingController.cancelBooking);

export default router;
