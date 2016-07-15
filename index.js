let app = require('./server/server');
let port = process.env.PORT || 8000;

app.listen(port);
console.log("server now listening on port: " + port);
