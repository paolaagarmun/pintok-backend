const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

//connect to db
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to db ...'))
    .catch(() => console.log("Couldn't connect to db ..."))

//middlewares
app.use(cors());
app.use(express.json())

//routes
app.get("/", (req,res) => res.json({message: "Server works"}))
app.use("/api/categories", require('./routes/category'));
app.use("/api/tiktoks", require('./routes/video'))
app.use("/api/auth", require("./routes/auth"))

//connect to server
const port = process.env.PORT
app.listen(port, () => {console.log('Server is running...')})