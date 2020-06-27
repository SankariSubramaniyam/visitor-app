const express = require('express');
const path = require('path');
const app = express();

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

app.use(forceSSL());

// Serve static files....
app.use(express.static(__dirname + '/dist'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);