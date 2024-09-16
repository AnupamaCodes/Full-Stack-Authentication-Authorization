const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorizeed Missing token!" });
  }
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token format" });
  }
  // console.log("authHeader", token, secretKey);
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.err("Token Verification Error:", err);
      return res.status(403).json({ message: "Forbidden : Invalid Token" });
    }
    req.user = user;
    next();
  });
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = { authenticateToken, verifyToken };
