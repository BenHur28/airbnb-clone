require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");

const download = require("image-downloader");
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const PlaceModel = require("./models/Place");
const BookingModel = require("./models/Booking");

const PORT = 3000;
const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cookieparser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
	cors({
		credentials: true,
		origin: "http://127.0.0.1:5173",
	})
);

mongoose.connect(process.env.MONGO_URL);

app.get("/", (req, res) => {
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

app.post("/logout", (req, res) => {
	res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
	const { link } = req.body;
	const newName = "photo" + Date.now() + ".jpg";
	try {
		await download.image({
			url: link,
			dest: __dirname + "/uploads/" + newName,
		});
		res.json(newName);
	} catch (e) {
		console.log(e);
	}
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
	const uploadedFiles = [];
	for (let i = 0; i < req.files.length; i++) {
		const { path, originalname } = req.files[i];
		const parts = originalname.split(".");
		const path2 = path.split(String.fromCharCode(92));
		const ext = parts[parts.length - 1];
		const newPath = path2[0] + "/" + path2[1] + "." + ext;
		fs.renameSync(path, newPath);
		uploadedFiles.push(newPath.replace("uploads/", ""));
	}
	res.json(uploadedFiles);
});

app.get("/places", async (req, res) => {
	res.json(await PlaceModel.find());
});

app.post("/places", async (req, res) => {
	const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
	const { token } = req.cookies;
	jwt.verify(token, jwtSecret, {}, async (err, userData) => {
		if (err) throw err;
		const place = await PlaceModel.create({
			owner: userData.id,
			title,
			address,
			photos: addedPhotos,
			description,
			perks,
			extraInfo,
			checkIn,
			checkOut,
			maxGuests,
			price,
		});
		res.json(place);
	});
});

app.put("/places/", async (req, res) => {
	const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
	const { token } = req.cookies;
	jwt.verify(token, jwtSecret, {}, async (err, userData) => {
		if (err) throw err;
		const place = await PlaceModel.findById(id);
		if (userData.id === place.owner.toString()) {
			place.set({
				title,
				address,
				photos: addedPhotos,
				description,
				perks,
				extraInfo,
				checkIn,
				checkOut,
				maxGuests,
				price,
			});
			await place.save();
			res.json("ok");
		}
	});
});

app.get("/places/:id", async (req, res) => {
	const { id } = req.params;
	res.json(await PlaceModel.findById(id));
});

app.get("/user-places", async (req, res) => {
	const { token } = req.cookies;
	jwt.verify(token, jwtSecret, {}, async (err, userData) => {
		if (err) throw err;
		const { id } = userData;
		res.json(await PlaceModel.find({ owner: id }));
	});
});

app.post("/bookings", async (req, res) => {
	const { place, checkIn, checkOut, maxGuests, name, phone, price } = req.body;
	const { token } = req.cookies;
	jwt.verify(token, jwtSecret, {}, async (err, userData) => {
		if (err) throw err;
		const booking = await BookingModel.create({
			place: place,
			user: userData.id,
			checkIn: checkIn,
			checkOut: checkOut,
			name: name,
			phone: phone,
			maxGuests: maxGuests,
			price: price,
		});
		res.json(booking);
	});
});

app.get("/bookings", async (req, res) => {
	const { token } = req.cookies;
	jwt.verify(token, jwtSecret, {}, async (err, userData) => {
		if (err) throw err;
		const { id } = userData;
		res.json(await BookingModel.find({ user: id }).populate("place"));
	});
});

app.listen(PORT, function (err) {
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
