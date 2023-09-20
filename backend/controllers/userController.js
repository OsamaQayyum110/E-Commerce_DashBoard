const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");


//for Sign-up
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please Fill All The Fields")
    }

    //for login

    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("User Already Exist!")
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });
    
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token:generateToken(user._id),
        });
    } else {
        res.status(400)
        throw new Error("Something Went Wrong");
    }


    
});

//for login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please Fill All The Fields");
    }
    const user = await User.findOne({ email })

      if (user && (await user.matchPassword(password))) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          token: generateToken(user._id),
        });
      } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
      }
});



    module.exports = { registerUser, loginUser };
