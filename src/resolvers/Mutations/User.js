const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../../utils");

const User = require("../../models/user");

//signup
const signup = async (_parent, args ) => {
  const password = await bcrypt.hash(args.password, 10);

  const user = await new User({
    email: args.email,
    password,
  }).save();

  const token = jwt.sign({ userId: user._id }, APP_SECRET, {
    expiresIn: "24h",
  });

  return { token, user };
}

//login
const login = async (_parent, args ) => {
  const user = await User.findOne({ email: args.email });
  if (!user) {
    throw new Error("user does not exist");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("password incorrect");
  }

  const token = jwt.sign({ userId: user._id }, APP_SECRET, {
    expiresIn: "24h",
  });

  return { token, user };
}

//exports 
exports.signup = signup;
exports.login = login;