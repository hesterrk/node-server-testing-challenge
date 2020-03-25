const router = require("express").Router();
const restrict = require("../middleware/resticted-middleware");
const Users = require("./users-model.js");


router.get("/", restrict(), async (req, res) => {
  try {
    res.json(await Users.find());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await Users.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Could not find user with given id." });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Users.remove(req.params.id);
    if (deleted > 0) {
      res.status(200).json({ message: "The user has been deleted" });
    } else {
      res.status(404).json({ message: "The user could not be found" });
    }
  } catch (error) {
    next(error);
  }
});







module.exports = router;