const db = require("../db");

class CharacterController {
    async addCharacter(req, res) {
        try {
            const { name, description, appearance } = req.body;

            const newCharacter = await db.query(
                'INSERT INTO characters (data) VALUES (?)',
                [JSON.stringify({ name, description, appearance })]
            );

            const lastInsertId = newCharacter.insertId;

            const insertedCharacter = await db.query(
                'SELECT * FROM characters WHERE id = ?',
                [lastInsertId]
            );

            res.json(insertedCharacter);
        } catch (error) {
            console.error("Error adding character:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getAllCharacters(req, res) {
        try {
            const characters = await db.query('SELECT * FROM characters');
            res.json(characters);
        } catch (error) {
            console.error("Error getting characters:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getOneCharacter(req, res) {
        try {
            const characterId = req.params.id;
            const character = await db.query('SELECT * FROM characters WHERE id = ?', [characterId]);

            if (character.length === 0) {
                res.status(404).json({ error: "Character not found" });
            } else {
                res.json(character[0]);
            }
        } catch (error) {
            console.error("Error getting character:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async updateCharacter(req, res) {
        try {
            const characterId = req.params.id;
            const { name, description, appearance } = req.body;

            await db.query(
                'UPDATE characters SET data = ? WHERE id = ?',
                [JSON.stringify({ name, description, appearance }), characterId]
            );

            const updatedCharacter = await db.query(
                'SELECT * FROM characters WHERE id = ?',
                [characterId]
            );

            res.json(updatedCharacter);
        } catch (error) {
            console.error("Error updating character:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async deleteCharacter(req, res) {
        try {
            const characterId = req.params.id;

            await db.query('DELETE FROM characters WHERE id = ?', [characterId]);

            res.json({ message: "Character successfully deleted" });
        } catch (error) {
            console.error("Error deleting character:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = new CharacterController();
