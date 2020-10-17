// really important stuff
const express = require('express');
const cors = require('cors');

// truthTableGenerator is our module that generates the table :D
const truthTableGenerator = require('./truthTableGenerator');

// listens to this port below
const port = 3000;
const app = express();

app.use(cors());
app.listen(port, () => {console.log("-- Server is running on " + port + " port --")});

// it's our endpoint to receive a logic expressions as string and deliver a truth table ;)
app.get("/truthTable", (req, res) => {
    console.log("\nRequest received on truthTable");
    let logicExpression = req.query.expression || "";
    console.log("It received the following string as parameter: " + logicExpression);
    // where the magic happens
    let table = truthTableGenerator.generateTable(logicExpression);
    
    // if we don't have our generator ready yet, this is just a mock of how a table should be
    let mockTable = {
        header: [{text: 'R', value: 'R'},
                 {text: 'P', value: 'P'},
                 {text: 'P^Q', value: 'PandQ'}],
        rows: [{R: 'T', P: 'T', PandQ: 'T'},
               {R: 'T', P: 'F', PandQ: 'F'},
               {R: 'F', P: 'T', PandQ: 'F'},
               {R: 'F', P: 'F', PandQ: 'F'}]
    };

    // finally delivers our table to our requester
    table ? res.send(table) : res.send(mockTable);
    console.log("-> truthTable delivered");
}); 