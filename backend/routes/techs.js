const express = require("express");
const router = express.Router();

// @route   GET api/techs
// @desc    Get all techs
// @access  Public
router.get("/", (req, res) => {
  res.send("Get all techs");
});

// @route   POST api/techs
// @desc    Add new tech
// @access  Public
router.post("/", async (req, res) => {
  try {
    let tech;

    const {} = req.body;

    tech = new Tech({
      title,
      message,
      priority,
      tech,
      date
    });

    await tech.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
  res.send("Add tech");
});

// @route   PUT api/techs/:id
// @desc    Update tech
// @access  Public
router.put("/:id", (req, res) => {
  res.send("Update tech");
});

// @route   DELETE api/techs/:id
// @desc    Delete tech
// @access  Public
router.delete("/:id", (req, res) => {
  res.send("Delete tech");
});

module.exports = router;
