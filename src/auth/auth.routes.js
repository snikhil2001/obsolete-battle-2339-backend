const express = require("express");
const User = require("./auth.model");
const jwt = require("jsonwebtoken");
const app = express.Router();
const passport = require("passport");
const secret = process.env.SECRET_PASSWORD;

const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "310569852098-m4ap3838lg1a7t3kqjlphe1tvo8hoce4.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8080/auth/google/callback",
      passReqToCallback: true,
    },

    async function (request, accessToken, refreshToken, profile, done) {
      const user = profile._json;
      return done(null, user);
    }
  )
);

app.post("/", async (req, res) => {
  return res.send("welcome to auth");
});

app.post("/signup", async (req, res) => {
  const { firstname, lastname, username, email, password, confirmpassword } =
    req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res
      .status(403)
      .send({ message: "user already exists,please login" });
  }

  if (password !== confirmpassword) {
    return res.send({
      message: "password doesn't matches with confirmpassword",
    });
  }

  await User.create({
    firstname,
    lastname,
    username,
    email,
    password,
  });

  return res.status(201).send({
    message: "user created successfully",
    firstname,
    lastname,
    email,
    username,
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(403).send({ message: "Invalid password" });
  }

  const token = jwt.sign(
    {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      role: user.role,
    },
    secret
  );

  return res.send({ message: "login success", token });
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:8080/",
    session: false,
  }),
  async function (req, res) {
    if (req.user.email_verified) {
      const existing = await User.findOne({ email: req.user.email });
      if (existing) {
        return res.send({ message: "user already exists" });
      }
      const user = await User.create({
        firstname: req.user.given_name,
        lastname: req.user.family_name,
        email: req.user.email,
      });
      const token = jwt.sign(
        {
          firstname: req.user.given_name,
          lastname: req.user.family_name,
          email: req.user.email,
        },
        secret
      );

      return res.send({ message: "login success", token });
    }
  }
);

module.exports = app;
