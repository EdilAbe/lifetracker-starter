const db = require("../db");
const { UnauthorizedError, BadRequestError } = require("../utils/errors");

class Nutrition {
  static async createNutrition({ nutritionForm, userId }) {
    // throw error if any credential fields are missing
    const requiredFields = ["name", "category", "calories", "image_url"];

    requiredFields.forEach((field) => {
      if (!nutritionForm.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    // const quantity = nutritionForm?.quantity || 1;

    // create a new nutrition for the user
    const result = await db.query(
      `
            INSERT INTO nutrition (
                name,
                category,
                quantity,
                calories,
                image_url,
                user_id
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, name, category, quantity, calories, image_url, user_id, created_at;
        `,
      [
        nutritionForm.name,
        nutritionForm.category,
        // quantity,
        nutritionForm.calories,
        nutritionForm.image_url,
        userId,
      ]
    );

    const nutrition = result.rows[0];
    return nutrition;
  }

  static async fetchNutritionById(id) {
    if (!id) {
      throw new BadRequestError("ID not provided");
    }

    const query = `SELECT * FROM nutrition WHERE id = $1 LIMIT 1`;
    const result = await db.query(query, [id]);

    if (result) {
      const nutrition = result.rows[0];
      return nutrition;
    } else {
      throw new NotFoundError("Nutrition not found");
    }
  }

  static async listNutritionForUser(user_id) {
    if (!user_id) {
      throw new BadRequestError("User ID not provided");
    }

    // get all the rows in nutrition for that userId
    const query = `SELECT * FROM nutrition
                       WHERE user_id = $1
                       ORDER BY created_at DESC
                      `;
    const result = await db.query(query, [user_id]);

    return result.rows;
  }
}

module.exports = Nutrition;
