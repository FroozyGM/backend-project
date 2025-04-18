import { User } from "../models/User.js";
import { Booking } from "../models/Booking.js";

class UserController {
  // GET /api/users/profile
  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      const userData = {
        name: user.name,
        email: user.email || "",
        phone: user.phone,
        photo: user.photo || "",
        role: user.role,
      };

      res.json(userData);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  // PUT /api/users/profile
  async updateProfile(req, res) {
    try {
      const { name, email, photo, phone } = req.body;

      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      if (name) user.name = name;
      if (email) user.email = email;
      if (photo) user.photo = photo;
      if (phone) user.phone = phone;

      await user.save();

      const userData = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
        role: user.role,
      };

      res.json(userData);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/users/bookings
  async getBookingHistory(req, res) {
    try {
      console.log("Getting booking history for user:", req.user.id);

      const bookings = await Booking.find({ user: req.user.id })
        .populate("coworking", "name location")
        .sort({ createdAt: -1 });

      console.log("Found bookings:", bookings.length);

      const bookingHistory = bookings.map((booking) => {
        try {
          // Проверка наличия необходимых данных
          if (!booking.coworking) {
            console.error("Booking has no coworking data:", booking._id);
            return {
              id: booking._id,
              coworkingName: "Неизвестно",
              location: "Неизвестно",
              date: new Date(booking.startDate).toISOString().split("T")[0],
              duration: calculateDuration(booking.startDate, booking.endDate),
              status: booking.status,
            };
          }

          return {
            id: booking._id,
            coworkingName: booking.coworking.name || "Неизвестно",
            location: booking.coworking.location || "Неизвестно",
            date: new Date(booking.startDate).toISOString().split("T")[0],
            duration: calculateDuration(booking.startDate, booking.endDate),
            status: booking.status,
          };
        } catch (mapError) {
          console.error("Error mapping booking:", mapError);
          return {
            id: booking._id,
            error: "Ошибка обработки бронирования",
            status: booking.status,
          };
        }
      });

      res.json(bookingHistory);
    } catch (error) {
      console.error("Error in getBookingHistory:", error.message);
      res.status(500).json({ error: error.message });
    }
  }

  // GET /api/users/current-bookings
  async getCurrentBookings(req, res) {
    try {
      const currentDate = new Date();

      const bookings = await Booking.find({
        user: req.user.id,
        status: "confirmed",
        endDate: { $gte: currentDate },
      })
        .populate("coworking", "name location")
        .sort({ startDate: 1 });

      const currentBookings = bookings.map((booking) => {
        const duration = calculateDuration(booking.startDate, booking.endDate);
        return {
          id: booking._id,
          coworkingName: booking.coworking.name,
          location: booking.coworking.location,
          date: new Date(booking.startDate).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          duration,
        };
      });

      res.json(currentBookings);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  // DELETE /api/users/bookings/:bookingId
  async deleteBooking(req, res) {
    try {
      const booking = await Booking.findById(req.params.bookingId);

      if (!booking) {
        return res.status(404).json({ message: "Бронирование не найдено" });
      }

      if (booking.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ message: "Нет прав для удаления бронирования" });
      }

      if (booking.status !== "pending" && booking.status !== "confirmed") {
        return res
          .status(400)
          .json({ message: "Невозможно удалить это бронирование" });
      }

      booking.status = "cancelled";
      await booking.save();

      res.json({ message: "Бронирование отменено" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

function calculateDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffHours = Math.round((end - start) / (1000 * 60 * 60));

  if (diffHours < 24) {
    return `${diffHours} часа`;
  } else {
    const days = Math.floor(diffHours / 24);
    return `${days} день`;
  }
}

export default new UserController();
