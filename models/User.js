const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    fullname: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["teacher", "learner"],
        required: true
    },

    email: {
        type: String,
        default: null
    },

    lrn: {
        type: String,
        default: null
    },

    password: {
        type: String,
        required: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);