require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Amplitude = require('./lib');
const api_key = process.env.API_KEY;


const amplitude = new Amplitude({ api_key: api_key })

// Middleware
app.use(bodyParser.json());

app.post('/', function(req, res){
  const event = req.body;
  amplitude[event.event](event, function(err, res){
    if (err){
      console.log(err);
      return;
    }
    return res;
  })
})

app.listen(3000, function(){
  console.log('Server listening for requests on port: 3000');
});
