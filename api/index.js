require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const PORT = 3000;

const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cookieparser());
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
	try {
		const user = await UserModel.create({
			name: name,
			email: email,
			password: bcrypt.hashSync(password, bcryptSalt),
		});
		res.json(user);
	} catch (e) {
		res.status(422).json(e);
	}
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await UserModel.findOne({ email: email });
	if (user) {
		const passOk = bcrypt.compareSync(password, user.password);
		if (passOk) {
			jwt.sign({ email: user.email, id: user._id }, jwtSecret, {}, (err, token) => {
				if (err) throw err;
				res.cookie("token", token).json(user);
			});
		} else {
			res.status(422).json("password is not correct");
		}
	} else {
		res.json("not found");
	}
});

app.get("/profile", (req, res) => {
	const { token } = req.cookies;
	if (token) {
		jwt.verify(token, jwtSecret, {}, async (err, userData) => {
			if (err) throw err;
			const { name, email, _id } = await UserModel.findById(userData.id);
			res.json({ name, email, _id });
		});
	} else {
		res.json(null);
	}
});

app.listen(PORT, function (err) {
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
