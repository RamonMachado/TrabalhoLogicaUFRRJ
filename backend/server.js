const express = require('express');
var cors = require('cors');

const port = 3000;

const app = express();

app.use(cors());
app.listen(port, () => {console.log("-- Server is running on " + port + " port --")});

app.get("/truthTable", (req, res) => {
    
    res.send("Pronto, toma essa tabela aí que eu fiz pra vc");
});