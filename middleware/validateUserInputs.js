function validateUserInputs() {
    return (req, res, next) => {
      const { username, password } = req.body;
  
      if (password.length < 4 || password.length > 50) {
        res
          .status(400)
          .json({ message: "Password length should be between 5-49 characters" });
      }
  
      if (username.length < 3 || username.length > 10) {
        res
          .status(400)
          .json({ message: "Username length should be between 4-9 characters" });
      }
  
      return next();
    };
  }
  
  module.exports = validateUserInputs;
  