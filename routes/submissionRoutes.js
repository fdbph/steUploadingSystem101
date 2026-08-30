const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const {
    uploadActivity,
    getMyActivities,
    downloadSubmission,
    getDashboardStats,
    deleteSubmission
} = require("../controllers/submissionController");

const {
    isLearner
} = require("../middleware/learnerMiddleware");


router.post(
    "/upload",
    isLearner,
    upload.single("file"),
    uploadActivity
);


router.get(
    "/my-activities",
    isLearner,
    getMyActivities
);


router.get(
    "/download/:id",
    isLearner,
    downloadSubmission
);


router.get(
    "/dashboard",
    isLearner,
    getDashboardStats
);


router.delete(
    "/:id",
    isLearner,
    deleteSubmission
);


module.exports = router;