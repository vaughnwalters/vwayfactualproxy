'use strict'

const express = require('express')
const app = express()
const port = process.env.PORT || 6660
app.set('port', port)
let Factual = require('factual-api');
let factual = new Factual('l4WbDnA1iuX1pLI8cD3l0Kkt2QbI9zG37eUI4QZU', 'p2MkmzSPXNLNgjPjEZ4y6IlQPwohaCwhi4cdH294');

// console.log("factual", factual);

app.get('*', (req, res) => {
  console.log(req.url)
// req.url has what comes from the browser
// let test = `/t/restaurants-us?filters={"$and":[{"cuisine":{"$includes":"vegan"}}]}&q=honolulu hi`

let newURL = `${req.url}`.replace(/%22/g, '"');
// console.log("newURL", newURL);
newURL = newURL.replace(/%20/g, ' ');
// console.log("newURL", newURL);
  // factual.get('/t/restaurants-us?filters={"$and":[{"cuisine":{"$includes":"vegan"}}]}&q=${searchText}', function (error, data) {
  factual.get(newURL, function (error, data) {
    res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');

// factual.get('/t/places-us/schema', function (error, res) {
  // if (error) {
    console.log("error", error);
  // }
  // console.log("data", data.data);
  // console.log("res", res);
  // console.log(res.view);
  res.send(data);
});

})

app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)
