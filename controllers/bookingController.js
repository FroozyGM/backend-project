import { Booking } from "../models/Booking.js";
import { Coworking } from "../models/Coworking.js";

class BookingController {
  async createBooking(req, res) {
    try {
      const { coworkingId, startDate, endDate } = req.body;
      const coworking = await Coworking.findById(coworkingId);

      if (!coworking) {
        return res.status(404).json({ message: "Коворкинг не найден" });
      }

      const booking = new Booking({
        user: req.user.id,
        coworking: coworkingId,
        startDate,
        endDate,
      });

      await booking.save();
      res.status(201).json(booking);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async getUserBookings(req, res) {
    try {
      const bookings = await Booking.find({ user: req.user.id })
        .populate("coworking", "name location")
        .sort({ createdAt: -1 });
      res.json(bookings);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async cancelBooking(req, res) {
    try {
      const booking = await Booking.findById(req.params.id);

      if (!booking) {
        return res.status(404).json({ message: "Бронирование не найдено" });
      }

      if (booking.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ message: "Нет прав для отмены бронирования" });
      }

      if (booking.status === "cancelled") {
        return res.status(400).json({ message: "Бронирование уже отменено" });
      }

      booking.status = "cancelled";
      await booking.save();

      res.json(booking);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new BookingController();
