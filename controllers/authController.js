const User = require("../models/User");

const login = async (req, res) => {

    try {

        const { role, username, password } = req.body;

        let user;

        if (role === "teacher") {

    user = await User.findOne({
        email: username,
        role: "teacher"
    });

} else if (role === "learner") {

    user = await User.findOne({
        lrn: username,
        role: "learner"
    });

} else {

    return res.status(400).json({

        success: false,

        message: "Invalid role."

    });

}
        if (user.password !== password) {

            return res.status(401).json({
                success: false,
                message: "Invalid credentials."
            });

        }

        req.session.user = {

            id: user._id,

            fullname: user.fullname,

            role: user.role

        };

        res.json({

    success: true,

    role: user.role

});

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false

        });

    }

};


const me = (req, res) => {

    res.json(req.session.user);

};


const logout = (req, res) => {

    req.session.destroy(() => {

        res.json({

            success: true

        });

    });

};


module.exports = {

    login,

    me,

    logout

};