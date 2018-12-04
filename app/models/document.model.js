var mongoose = require("mongoose");

var schema = mongoose.Schema({

    title: { type: String, required: true },
    description: String,

});

var Document = module.exports = mongoose.model("Document", schema);
