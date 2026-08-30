const express = require("express");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");
const session = require("express-session");
const path = require("path");
const submissionRoutes = require("./routes/submissionRoutes");
const multer = require("multer");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//session config update as of aug 30, 2026
app.use(
    session({

        secret: process.env.SESSION_SECRET,

        resave: false,

        saveUninitialized: false,

        cookie: {

            httpOnly: true,

            secure: process.env.NODE_ENV === "production",

            maxAge: 1000 * 60 * 60 * 4

        }

    })
);
// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); //newly added - 07 25, 2026

// Temporary route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

const PORT = process.env.PORT || 3000;

app.use("/api", authRoutes);
app.use("/api/submissions", submissionRoutes); // added july 07, 2026

//added as of aug 30 as multer error handler
app.use((err, req, res, next) => {

    console.error(err);

    if (err instanceof multer.MulterError) {

        if (err.code === "LIMIT_FILE_SIZE") {

            return res.status(400).json({

                success: false,

                message: "File is too large. Maximum size is 25 MB."

            });

        }

        return res.status(400).json({

            success: false,

            message: err.message

        });

    }

    if (err) {

        return res.status(400).json({

            success: false,

            message: err.message || "Something went wrong."

        });

    }

    next();

});


app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});