const isLearner = (req, res, next) => {

    if (!req.session.user) {

        return res.status(401).json({
            success: false,
            message: "Please log in."
        });

    }

    if (req.session.user.role !== "learner") {

        return res.status(403).json({
            success: false,
            message: "Only learners can access this feature."
        });

    }

    next();

};

module.exports = {
    isLearner
};