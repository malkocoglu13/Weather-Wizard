import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

// Access API_KEY and API_URL from process.env
const yourAPIKey = process.env.API_KEY;
const API_URL = process.env.API_URL;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index.ejs", { content: null });
});

app.post("/weather", async (req, res) => {
    try {
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;

        const result = await axios.get(API_URL, {
            params: {
                lat: latitude,
                lon: longitude,
                appid: yourAPIKey,
                units: "imperial",
            },
        });

        res.render("index.ejs", { content: result.data });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
