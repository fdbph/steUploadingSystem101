const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({

    learnerId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    activityTitle: {

        type: String,

        required: true

    },

    subject: {

        type: String,

        required: true

    },

    filename: {

        type: String,

        required: true

    },

    originalName: {

        type: String,

        required: true

    },

    filePath: {

        type: String,

        required: true

    },

    fileSize: {

        type: Number,

        required: true

    },

    status: {

        type: String,

        enum: ["Submitted", "Graded"],

        default: "Submitted"

    },

    score: {

        type: Number,

        default: null

    },

    feedback: {

        type: String,

        default: ""

    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Submission", submissionSchema);