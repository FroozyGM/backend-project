import express from "express";
import authController from "../controllers/authController.js";
import auth from "../middlewares/auth.js";
import {
  registerValidator,
  loginValidator,
  ownerValidator,
  validate,
} from "../validators/auth.js";

const router = express.Router();

router.post("/register", registerValidator, validate, authController.register);
router.post("/login", loginValidator, validate, authController.login);
router.post(
  "/become-owner",
  ownerValidator,
  validate,
  authController.becomeOwner
);
router.post("/refresh-token", auth, authController.refreshToken);
router.post("/logout", auth, authController.logout);

export default router;
