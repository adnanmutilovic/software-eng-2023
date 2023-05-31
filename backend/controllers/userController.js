const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

const getUserProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

const getFavoriteCurrencies = async (req, res) => {
  try {
    const favoriteCurrencies = req.user.favorites; // or however you access the favorites in your User model
    res.status(200).json(favoriteCurrencies);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

const removeCurrencyFromFavorites = async (req, res) => {
  try {
    const currencyId = req.params.currencyId;
    req.user.favorites = req.user.favorites.filter((id) => id !== currencyId); // or however you remove a currency from favorites in your User model
    await req.user.save();
    res.status(200).json(req.user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getFavoriteCurrencies,
  removeCurrencyFromFavorites,
};