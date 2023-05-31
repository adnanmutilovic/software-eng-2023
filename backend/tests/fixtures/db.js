const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../models/User");
const config = require("../../config");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  username: "testuser1",
  email: "testuser1@example.com",
  password: "testpass123",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, config.JWT_SECRET),
    },
  ],
};

const setupUser = async () => {
  await User.deleteMany();
  await new User(userOne).save();
};

module.exports = {
  userOneId,
  userOne,
  setupUser,
};
