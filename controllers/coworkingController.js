import { Coworking } from "../models/Coworking.js";
import { Booking } from "../models/Booking.js";

class CoworkingController {
  async getAllCoworkings(req, res) {
    try {
      const coworkings = await Coworking.find().select(
        "id name description pricePerHour location type images amenities"
      );

      const formattedCoworkings = coworkings.map((coworking) => ({
        id: coworking._id,
        name: coworking.name,
        description: coworking.description,
        pricePerHour: `${coworking.pricePerHour} ₸`,
        location: coworking.location,
        type: coworking.type,
        image: coworking.images[0],
        amenities: coworking.amenities.map((a) => a.name),
      }));

      res.json(formattedCoworkings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCoworkingDetails(req, res) {
    try {
      const coworking = await Coworking.findById(req.params.id);

      if (!coworking) {
        return res.status(404).json({ message: "Коворкинг не найден" });
      }

      const coworkingData = {
        id: coworking._id,
        name: coworking.name,
        description: coworking.description,
        pricePerHour: `${coworking.pricePerHour} ₸`,
        pricePerDay: `${coworking.pricePerDay} ₸`,
        pricePerMonth: `${coworking.pricePerMonth} ₸`,
        location: coworking.location,
        amenities: coworking.amenities,
        images: coworking.images,
      };

      res.json(coworkingData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async bookCoworking(req, res) {
    try {
      const coworkingId = req.params.id;
      const { startDate, endDate } = req.body;

      const coworking = await Coworking.findById(coworkingId);

      if (!coworking) {
        return res.status(404).json({ message: "Коворкинг не найден" });
      }

      // Проверка доступности коворкинга на указанную дату
      const existingBooking = await Booking.findOne({
        coworking: coworkingId,
        status: { $ne: "cancelled" },
        $or: [
          {
            startDate: { $lte: new Date(endDate) },
            endDate: { $gte: new Date(startDate) },
          },
        ],
      });

      if (existingBooking) {
        return res
          .status(400)
          .json({ message: "Коворкинг недоступен на указанное время" });
      }

      const booking = new Booking({
        user: req.user.id,
        coworking: coworkingId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: "pending",
      });

      await booking.save();

      res.status(201).json({
        message: "Запрос на бронирование создан",
        booking,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CoworkingController();
