require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const PORT = 3000;

const bcryptSalt = bcrypt.genSaltSync(12);

app.use(express.json());
app.use(
	cors({
		credentials: true,
		origin: "http://127.0.0.1:5173",
	})
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
	res.json("TEST OK");
});

app.post("/register", async (req, res) => {
	const { name, email, password } = req.body;
	const user = await UserModel.create({
		name: name,
		email: email,
		password: bcrypt.hashSync(password, bcryptSalt),
	});
	res.json(user);
});

app.listen(PORT, function (err) {
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
