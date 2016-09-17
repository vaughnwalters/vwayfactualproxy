'use strict'

const express = require('express')
const app = express()
const port = process.env.PORT || 6660
app.set('port', port)
let Factual = require('factual-api');
let factual = new Factual('l4WbDnA1iuX1pLI8cD3l0Kkt2QbI9zG37eUI4QZU', 'p2MkmzSPXNLNgjPjEZ4y6IlQPwohaCwhi4cdH294');
const get = require('request').get;

// MIDDLEWARE (transform stream)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// FACTUAL PROXY
app.get('/t/*', (req, res) => {
  let newURL = `${req.url}`.replace(/%22/g, '"');
  newURL = newURL.replace(/%20/g, ' ');
  factual.get(newURL, function (error, data) {
  res.send(data);
  });
})

// GOOGLE MAPS PROXY
app.get('/maps/*', (req, res) => {
  let newMapsURL = req.url
  newMapsURL = `https://maps.googleapis.com${newMapsURL}`
  get(newMapsURL, (err, _, body) => {
    res.send(body)
  });
});

app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)
