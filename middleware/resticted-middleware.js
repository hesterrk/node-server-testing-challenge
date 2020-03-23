const jwt = require("jsonwebtoken");

function restrict() {
  const authError = {
    message: "Invalid credentials"
  };

  return async (req, res, next) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json(authError);
      }

      //Verify the token's signiture:
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json(authError);
        }

        req.token = decoded;
        next();
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = restrict;