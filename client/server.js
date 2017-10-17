// requiring dependencies
let path = require('path');
let express = require('express');

// initializing variables
let distDir = path.join(__dirname, 'dist');
let port = 3000;
let app = express();

// serving the files on dist folder
app.use(express.static(distDir));

// send index.html on the user request
app.get('*', function(req, res){
    res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port);