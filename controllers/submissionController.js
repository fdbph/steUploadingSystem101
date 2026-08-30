const Submission = require("../models/Submission");
const fs = require("fs");
const path = require("path");

const uploadActivity = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "Please select a file."

            });

        }

        const submission = await Submission.create({
            learnerId: req.session.user.id,

            activityTitle: req.body.activityTitle,

            subject: req.body.subject,

            filename: req.file.filename,

            originalName: req.file.originalname,

            filePath: req.file.path,

            fileSize: req.file.size
        });

        return res.json({

            success: true,

            message: "Activity uploaded successfully.",

            submission

        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({

            success: false,

            message: "Server Error."

        });

    }

};

const getMyActivities = async (req, res) => {

    try {

        const submissions = await Submission.find({

            learnerId: req.session.user.id

        }).sort({

            createdAt: -1

        });

        res.json({

            success: true,

            submissions

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: "Server Error."

        });

    }

};


const downloadSubmission = async (req, res) => {

    try {

        const submission = await Submission.findOne({

            _id: req.params.id,

            learnerId: req.session.user.id

        });

        if (!submission) {

            return res.status(404).json({

                success: false,

                message: "Submission not found."

            });

        }

        const filePath = path.join(
            __dirname,
            "..",
            submission.filePath
        );

        res.download(
            filePath,
            submission.originalName
        );

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: "Unable to download file."

        });

    }

};
//added
const deleteSubmission = async (req, res) => {

    try {

        const submission = await Submission.findOne({

            _id: req.params.id,

            learnerId: req.session.user.id

        });

        if (!submission) {

            return res.status(404).json({

                success: false,

                message: "Submission not found."

            });

        }

        const filePath = path.join(
            __dirname,
            "..",
            submission.filePath
        );

        if (fs.existsSync(filePath)) {

            fs.unlinkSync(filePath);

        }

        await Submission.findByIdAndDelete(req.params.id);

        res.json({

            success: true,

            message: "Submission deleted successfully."

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: "Unable to delete submission."

        });

    }

};
//added
const getDashboardStats = async (req, res) => {

    try {

        const learnerId = req.session.user.id;

        const totalUploads = await Submission.countDocuments({

            learnerId

        });

        const graded = await Submission.countDocuments({

            learnerId,

            status: "Graded"

        });

        const pending = await Submission.countDocuments({

            learnerId,

            status: "Submitted"

        });

        res.json({

            success: true,

            totalUploads,

            graded,

            pending

        });

    }

    catch(err){

        console.error(err);

        res.status(500).json({

            success:false

        });

    }

};


module.exports = {

    uploadActivity,

    getMyActivities,

    downloadSubmission,

    getDashboardStats,

    deleteSubmission

};