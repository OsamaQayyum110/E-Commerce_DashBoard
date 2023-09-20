const AsyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const protect = AsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
      try {
          token = req.headers.authorization.split(" ")[1];
          const decode = jwt.verify(token, process.env.JWT_SECRET);
          req.user = await User.findById(decode.id).select("-password");
          next();
      } catch (error) {
          res.status(401)
          throw new Error("No Authorization, Token failed ");
    }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not Authorized, No token")
    }
});

module.exports = { protect };