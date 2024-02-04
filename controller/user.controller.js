const bcrypt = require("bcrypt");
const db = require("../db");

class UserController {
  async registerUser(req, res) {
    try {
      const { login, password } = req.body;

      // Хешируем пароль перед сохранением в базу данных
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await db.query('INSERT INTO users (login, password) VALUES (?, ?)', [login, hashedPassword]);
      const lastInsertId = newUser.insertId;

      const insertedUser = await db.query('SELECT * FROM users WHERE id = ?', [lastInsertId]);

      res.json(insertedUser);
    } catch (error) {
      console.error("Ошибка при регистрации:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await db.query('SELECT * FROM users');
      res.json(users);
    } catch (error) {
      console.error("Ошибка при получении пользователей:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getOneUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);

      if (user.length === 0) {
        res.status(404).json({ error: "Пользователь не найден" });
      } else {
        res.json(user[0]);
      }
    } catch (error) {
      console.error("Ошибка при получении пользователя:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const { login, password } = req.body;

      // Хешируем пароль перед обновлением
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.query('UPDATE users SET login = ?, password = ? WHERE id = ?', [login, hashedPassword, userId]);
      const updatedUser = await db.query('SELECT * FROM users WHERE id = ?', [userId]);

      res.json(updatedUser);
    } catch (error) {
      console.error("Ошибка при обновлении пользователя:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;

      await db.query('DELETE FROM users WHERE id = ?', [userId]);

      res.json({ message: "Пользователь успешно удален" });
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new UserController();
