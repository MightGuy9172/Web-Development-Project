const { model } = require("mongoose");

const { PositionsSchema } = require("../schemas/PostionsSchema");

const PositionsModel = new model("position", PositionsSchema);

module.exports = { PositionsModel };
