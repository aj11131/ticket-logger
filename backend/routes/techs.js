const express = require("express");
const router = express.Router();

const Tech = require("../models/Tech");

// @route   GET api/techs
// @desc    Get all techs
// @access  Public
router.get("/", async (req, res) => {
  const techs = await Tech.find();
  res.send(techs);
});

// @route   POST api/techs
// @desc    Add new tech
// @access  Public
router.post("/", async (req, res) => {
  try {
    let tech;

    const { firstName, lastName } = req.body;

    tech = new Tech({
      firstName,
      lastName
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
