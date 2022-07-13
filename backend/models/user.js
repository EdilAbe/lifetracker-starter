const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { UnauthorizedError, BadRequestError } = require("../utils/errors");

class User {
  static async makePublicUser(user) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
    };
  }

  static async login(credentials) {
    // throw error if any crediential fields are missing
    const requiredFields = ["email", "password"];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    // look up if user registered in database with  same email
    const user = await User.fetchUserByEmail(credentials.email);
    // if user is found
    if (user) {
      // validate the password
      const isValid = await bcrypt.compare(credentials.password, user.password);
      // if there is a match, return the user
      if (isValid) {
        return User.makePublicUser(user);
      }
    }
    //  throw an error
    throw new UnauthorizedError("Incorrect email or password");
  }

  static async register(credentials) {
    const requiredFields = [
      "email",
      "username",
      "firstName",
      "lastName",
      "password",
    ];
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });

    if (credentials.email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.");
    }

    // if user try to create a new account with the same email
    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError(`Duplicate email: ${credentials.email}`);
    }

    //  hash the password
    const hashedPassword = await bcrypt.hash(
      credentials.password,
      BCRYPT_WORK_FACTOR
    );

    // lowercase email
    const lowercasedEmail = credentials.email.toLowerCase();

    //  lowercase user
    const lowercasedUsername = credentials.username.toLowerCase();

    // create a new user
    const result = await db.query(
      `
            INSERT INTO users (
                username,
                password,
                first_name,
                last_name,
                email
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, username, password, first_name, last_name, email, created_at;
        `,
      [
        lowercasedUsername,
        hashedPassword,
        credentials.firstName,
        credentials.lastName,
        lowercasedEmail,
      ]
    );

    // return the user
    const user = result.rows[0];
    console.log("new user", user);
    return User.makePublicUser(user);
  }

  // look up user by their email
  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }

    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(query, [email.toLowerCase()]);
    const user = result.rows[0];

    return user;
  }

  // look up user by their username
  static async fetchUserByUsername(username) {
    if (!username) {
      throw new BadRequestError("No username provided");
    }

    const query = `SELECT * FROM users WHERE username = $1`;
    const result = await db.query(query, [username.toLowerCase()]);

    const user = result.rows[0];

    return user;
  }
}

module.exports = User;
