const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("this is working!")
})

app.listen(3001, () => {
    console.log("Server is running on port 3001")
});