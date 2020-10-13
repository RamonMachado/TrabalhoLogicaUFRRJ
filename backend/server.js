const express = require('express');
var cors = require('cors');

const port = 3000;

const app = express();

app.use(cors());
app.listen(port, () => {console.log("-- Server is running on " + port + " port --")});

app.get("/truthTable", (req, res) => {
    console.log("request received on truthTable");
    res.send("Você recebeu uma linda tabela imaginária :D");
});