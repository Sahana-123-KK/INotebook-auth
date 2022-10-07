const express = require("express");
const User = require("../models/user");
const router = express.Router();
const users = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");

const authToken = "Iamaveryhappyandhealthypersonandgratefultogod";

router.post("/", (req, res) => {
  const usersign = users
    .create(req.body)
    .then(() => {
      res.json({ message: "Sign UP successful" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createuser", async (req, res) => {
  let success = false;
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res
        .status(402)
        .json({ success, error: "Enter all mandatory fields" });
    }

    const findOne = await User.findOne({ email: email });

    if (findOne) {
      return res.status(402).json({ success, error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const genpwd = await bcrypt.hash(password, salt);

    const newuse = User.create({ name, email, password: genpwd });

    //creating jwt for user
    let data = {
      user: {
        id: newuse._id,
      },
    };

    const token = jwt.sign(data, authToken);
    console.log(token);
    console.log(await newuse._id);
    // await newuse.save();
    // await User.save();
    success = true;

    res.status(200).json({ success, message: "Sign up successful", token });
  } catch (error) {
    console.log(error);
  }
});

//login api
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let success = false;
  if (!email || !password) {
    return res
      .status(402)
      .json({ success, error: "Enter all mandatory fields" });
  }

  const ispresent = await User.findOne({ email });
  if (!ispresent) {
    return res
      .status(402)
      .json({ success, error: "Login with incorrect credentials" });
  }

  const matchPwd = await bcrypt.compare(password, ispresent.password);
  if (!matchPwd) {
    return res
      .status(402)
      .json({ success, error: "Login with incorrect credentials" });
  }
  const datas = {
    user: {
      id: ispresent.id,
    },
  };
  const jwtoken = jwt.sign(datas, authToken);
  success = true;
  res.status(200).json({ success, jwtoken });

  console.log(ispresent.id);
});

//get userData
router.post("/getuser", fetchUser, async (req, res) => {
  console.log(req.user);
  const userid = req.user.id;
  const gettheuser = await User.findById(userid).select("-password");

  if (!gettheuser) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  res.status(200).send(gettheuser);
});
module.exports = router;
