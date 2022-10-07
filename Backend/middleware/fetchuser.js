const jwt = require("jsonwebtoken");
const authToken = "Iamaveryhappyandhealthypersonandgratefultogod";

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Please Login with valid token" });
  }

  try {
    const data = jwt.verify(token, authToken);
    req.user = data.user;
    console.log(data);

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Please Login with valid token" });
  }
};

module.exports = fetchUser;
