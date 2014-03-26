var express = require('express');
var app = express();

app.use(express.bodyParser());

var port = process.env.PORT || 8000;

var peers = [];

Array.prototype.remove = function(value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        return this.splice(idx, 1); // The second parameter is the number of elements to remove.
    }
    return false;
};

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
    next();
});

app.options('/', function(req, res) {
    console.log("Options request received");

    res.send();
    console.log("Sent response");
});

app.get('/', function(req, res) {
    console.log("Get request received");
    if (req.query.id) {
        var id = req.query.id;
        console.log("ID for peer: " + id);
        peers.push(id);
    }
    res.type('application/json');
    res.json({
        peers: peers,
        count: peers.length
    });
    // res.send("Hello");
    console.log("Sent response");
});

app.get('/delete', function(req, res) {
    console.log("Delete request received");
    if (req.query.id) {
        var id = req.query.id;
        console.log("ID to delete: " + id);
        peers.remove(id);
    }
    res.send(202);
    console.log("Sent response");
});

app.listen(port);

// Put a friendly message on the terminal
console.log("Bootstrap server listening on port " + port);