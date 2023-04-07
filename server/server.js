import express from "express";
import bodyParser from "body-parser";

//Init express
const app = express();

//Use bodyparser to parse the incoming json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let rooms = {};

//On post request
app.post("/", async (req, res) => {

    //TODO Add offer to database with filename and return roomID

});

app.get("/", async (req, res) => {
    const roomID = req.query.id;

    //TODO Get offer and filename from roomID

});

//Run express on port 8080
app.listen(8080, () => console.log("Server running on port 8080"));
