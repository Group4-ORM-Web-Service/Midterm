const { verifyToken } = require("../utils/jwtUtil");

const authMiddleware = (req, res, handleNext) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ message: "Missing header" });
  }

  if (!authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization scheme invalid" });
  }

  const [_schema, token] = authorization.split(" ");

  try {
    const payload = verifyToken(token);
    const { userId, role } = payload;
    req.user = { userId, role };
    handleNext()
  } catch (error) {
    return res.status(401).send({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
