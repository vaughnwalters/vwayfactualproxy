'use strict'

const express = require('express')
const app = express()
const port = process.env.PORT || 6660
app.set('port', port)
let Factual = require('factual-api');
let factual = new Factual('l4WbDnA1iuX1pLI8cD3l0Kkt2QbI9zG37eUI4QZU', 'p2MkmzSPXNLNgjPjEZ4y6IlQPwohaCwhi4cdH294');
const { get } = require('request');
// const request = require("request");
// const http = require("http");


// MIDDLEWARE (transform stream)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.get('/t/*', (req, res) => {
  // console.log(req.url)
  let newURL = `${req.url}`.replace(/%22/g, '"');
  newURL = newURL.replace(/%20/g, ' ');
  factual.get(newURL, function (error, data) {
    // console.log("factualData", data);
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    // console.log("error", error);
  // }
  // console.log("data", data.data);
  // console.log("res", res);
  // console.log(res.view);
  res.send(data);
  });
})


app.get('/maps/*', (req, res) => {
  // console.log("res", res);
  // console.log("req.url", req.url);
  let newMapsURL = req.url
  // newMapsURL = `${req.url}`.replace(/%22/g, '"');
  // newMapsURL = newMapsURL.replace(/%20/g, ' ');
  // console.log("newMapsURL", newMapsURL);
  newMapsURL = `https://maps.googleapis.com${newMapsURL}`
  console.log("newMapsURL", newMapsURL);

  get(newMapsURL, (err, _, body) => {
    // console.log("error", err);
    // console.log("body", body);
    res.send(body)
  });
});



app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)
