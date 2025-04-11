import bcrypt from "bcryptjs";

export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error(`Ошибка при хешировании пароля: ${error.message}`);
  }
}

export async function comparePasswords(password, hashedPassword) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error(`Ошибка при сравнении паролей: ${error.message}`);
  }
}
