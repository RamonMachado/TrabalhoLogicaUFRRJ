// really important stuff
const express = require('express');
const cors = require('cors');

// truthTableGenerator is our module that generates the table :D
const truthTableGenerator = require('./truthTableGenerator');

// listens to this port below
const port = 8080;
const app = express();

app.use(cors());
app.listen(port, () => {console.log("-- Server is running on " + port + " port --")});

// it's our endpoint to receive a logic expressions as string and deliver a truth table ;)
app.get("/truthTable", (req, res) => {
    console.log("\nRequest received on truthTable");
    let logicExpression = req.query.expression || "";
    console.log("It received the following string as parameter: " + logicExpression);

    try{
        // where the magic happens
        let table = truthTableGenerator.generateTable(logicExpression);
        // finally delivers our table to our requester
        res.send(table);
        console.log("-> truthTable delivered");
    } catch (err) {
        res.status(err.statusCode()).send({message: err.message});
    }
    
}); 