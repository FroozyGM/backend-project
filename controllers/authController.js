import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { hashPassword, comparePasswords } from "../services/bcrypt.js";
import dotenv from "dotenv";

dotenv.config();

class AuthController {
  async register(req, res) {
    try {
      const { name, phone, password, role } = req.body;

      let user = await User.findOne({ phone });

      if (user) {
        return res.status(400).json({ message: "Пользователь уже существует" });
      }

      const hashedPassword = await hashPassword(password);

      user = new User({
        name,
        phone,
        password: hashedPassword,
        role: role || "client",
      });

      await user.save();

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      console.log("JWT_EXPIRE:", process.env.JWT_EXPIRE);

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) throw err;
          res.json({
            token: `Bearer ${token}`,
            user: {
              id: user._id,
              name: user.name,
              phone: user.phone,
              role: user.role,
            },
          });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { phone, password } = req.body;

      let user = await User.findOne({ phone });

      if (!user) {
        return res.status(400).json({ message: "Неверные учетные данные" });
      }

      const isMatch = await comparePasswords(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Неверные учетные данные" });
      }

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      console.log("JWT_EXPIRE:", process.env.JWT_EXPIRE);

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) throw err;
          res.json({
            token: `Bearer ${token}`,
            user: {
              id: user._id,
              name: user.name,
              phone: user.phone,
              role: user.role,
            },
          });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async becomeOwner(req, res) {
    try {
      const { name, phone } = req.body;

      let user = await User.findOne({ phone });

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      user.role = "owner";
      if (name) user.name = name;

      await user.save();

      res.json({ message: "Статус успешно изменен на арендодателя" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async refreshToken(req, res) {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) throw err;
          res.json({
            token: `Bearer ${token}`,
            user: {
              id: user._id,
              name: user.name,
              phone: user.phone,
              role: user.role,
            },
          });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async logout(req, res) {
    try {
      return res.status(200).json({
        message: "Успешный выход из системы",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AuthController();
