import express from "express";
import userController from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.use(auth);

router.get("/profile", userController.getProfile);
router.put("/profile", userController.updateProfile);
router.get("/bookings", userController.getBookingHistory);
router.get("/current-bookings", userController.getCurrentBookings);
router.delete("/bookings/:bookingId", userController.deleteBooking);

export default router;
