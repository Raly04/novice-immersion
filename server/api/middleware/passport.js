/** @format */

const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const userModel = require("../models/auth-model");
require("dotenv").config();
require("express-async-errors");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
const strategy = new JwtStrategy(options, async (payload, cb) => {
  const user = await userModel.findOne({ _id: payload.sub });
  if (!user) cb(null, false);
  cb(null, user);
});

passport.use(strategy);
