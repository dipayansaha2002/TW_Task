const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//require("dotenv").config();
const dotenv = require("dotenv");
dotenv.config();
const upload = require("express-fileupload");


const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const {
    notFound,
    handleErrorMiddleware,
} = require("./middlewares/errorMiddlewares.js");


const server = express();


main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
}

// Define CORS options
const allowedOrigins = ["http://localhost:5173"];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

// Middleware setup
server.use(express.json({ extended: true }));
server.use(express.urlencoded({ extended: true }));
server.use(cors(corsOptions));
server.use(upload());
server.use("/uploads", express.static(__dirname + "/uploads"));

// Define routes
server.use("/api/users", userRoutes);
server.use("/api/posts", postRoutes);

// Homepage route
server.get("/", (req, res) => {
    res.send("Welcome to the Blog Backend!");
});

// Error handling middleware
server.use(notFound);
server.use(handleErrorMiddleware);

// Start server
server.listen(process.env.PORT, () => {
    console.log("Server running");
});
