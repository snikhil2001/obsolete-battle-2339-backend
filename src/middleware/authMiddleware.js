const User = require("../auth/auth.model");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(404).send({ message: "token is required" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_PASSWORD);

    if (!decoded) {
      return res.status(403).send({ message: "not authorized" });
    }

    const userId = decoded._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(403).send({ message: "user not authenticated" });
    }

    req.userId = userId;
    req.role = user.role;
    next();
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

module.exports = authMiddleware;
