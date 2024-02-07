const bcrypt = require("bcrypt");
const uuid = require("uuid");
const db = require("../db");

class SessionController {
  async addSession(req, res) {
    try {
      const { login, password, deviceName } = req.body;
      const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      // Check if the user exists
      const user = await db.query('SELECT * FROM users WHERE login = ?', [login]);

      if (!user || user.length === 0) {
        throw new Error("Пользователь не найден");
      }

      // Check if the password matches
      const passwordMatch = await bcrypt.compare(password, user[0].password);

      if (!passwordMatch) {
        throw new Error("Неверный пароль");
      }

      // Create a session
      const dateAdded = Math.floor(Date.now() / 1000);
      const isOnline = 1;
      const sessionToken = uuid.v4(); // Generate a session token using uuid

      const newSession = await db.query(
        'INSERT INTO sessions (user_id, ip, name, date_added, is_online, session) VALUES (?, ?, ?, ?, ?, ?)',
        [user[0].id, clientIp, deviceName || "Default Device", dateAdded, isOnline, sessionToken]
      );

      const sessionId = newSession.insertId;

      // Convert sessionId to a string before sending it in the response
      res.json({ sessionId: sessionId.toString(), sessionToken });

    } catch (error) {
      console.error("Ошибка при создании сессии:", error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async checkSession(req, res) {
    try {
      const { sessionToken } = req.body;

      // Check if the session exists
      const session = await db.query('SELECT * FROM sessions WHERE session = ?', [sessionToken]);

      console.log(sessionToken)
      console.log(session)

      if (!session || session.length === 0) {
        throw new Error("Неверная сессия");
      }

      res.json({ message: "Сессия действительна" });
    } catch (error) {
      console.error("Ошибка при проверке сессии:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new SessionController();
