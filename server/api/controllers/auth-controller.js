/** @format */

require("express-async-errors");
const { StatusCodes } = require("http-status-codes");
const model = require("../models/auth-model");
const { BadRequest, Unauthenticated, NotFound } = require("../errors/index");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequest("Please provide an email or password");
  const user = await model.findOne({ email: email });
  if (!user) throw new NotFound(`No user with email: ${email} found`);
  const isPasswordMatch = user.compare(password);
  if (!isPasswordMatch) throw new Unauthenticated("Password does not match");
  const token = user.createToken();
  res.status(StatusCodes.OK).json({ success: true, token: token, user: user });
};

const register = async (req, res) => {
  const user = await model.create(req.body);
  const token = user.createToken();
  res
    .status(StatusCodes.CREATED)
    .json({ success: true, token: token, id: user._id });
};

const utilisateur = async (req, res) => {
  const { id } = req.params;
  const user = await model.findById({ _id: id }).limit(1);
  res.status(200).json(user);
};

module.exports = { login, register, utilisateur };
