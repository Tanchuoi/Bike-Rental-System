import knex from "../database/knex.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

// Login
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await knex("user").where({ username }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      "process.env.JWT_SECRET",
      { expiresIn: "1h" }
    );

    res.json({
      user: { id: user.id, username: user.username, role: user.role },
      token,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: error.message });
  }
};

// Register
const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await knex("user").where({ username }).first();
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // '10' is the salt rounds

    await knex("user").insert({ username, password: hashedPassword });
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await knex("user").select(
      "id",
      "username",
      "role",
      knex.raw(`DATE_FORMAT(created_at, '%d/%m/%Y') AS created_at`)
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await knex("rental").where({ user_id: id }).del();
    await knex("user").where({ id }).del();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { login, register, getUsers, deleteUser };
