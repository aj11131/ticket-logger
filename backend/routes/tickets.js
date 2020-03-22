const express = require("express");
const router = express.Router();

const Ticket = require("../models/Ticket");

// @route   GET api/tickets
// @desc    Get all tickets
// @access  Public
router.get("/", async (req, res) => {
  const tickets = await Ticket.find();
  res.send(tickets);
});

// @route   POST api/tickets
// @desc    Add new ticket
// @access  Public
router.post("/", async (req, res) => {
  try {
    let ticket;

    const { title, message, priority, tech, date } = req.body;

    ticket = new Ticket({
      title,
      message,
      priority,
      tech,
      date
    });

    await ticket.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
  res.send("Add ticket");
});

// @route   PUT api/tickets/:id
// @desc    Update ticket
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let ticket = await Ticket.findOne({ _id: id });

    if (!ticket) {
      return res.status(400).json({ msg: "Ticket does not exist." });
    }

    const { title, message, priority, tech, date } = req.body;

    await Ticket.updateOne(
      { _id: id },
      {
        $set: {
          title: title,
          message: message,
          priority: priority,
          tech: tech,
          date: date
        }
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
  res.send("Update ticket");
});

// @route   DELETE api/tickets/:id
// @desc    Delete ticket
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let ticket = await Ticket.findOne({ _id: id });

    if (!ticket) {
      return res.status(400).json({ msg: "Ticket does not exist." });
    }

    await ticket.remove();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
  res.send("Delete ticket");
});

module.exports = router;
