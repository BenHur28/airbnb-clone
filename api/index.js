const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3000;

app.use(
	cors({
		credentials: true,
		origin: "http://127.0.0.1:5173",
	})
);

app.get("/test", (req, res) => {
	res.json("TEST OK");
});

app.listen(PORT, function (err) {
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
