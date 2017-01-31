const map = require('./mapper.js');
const request = require('request');

const Amplitude = function(settings){
  this.api_key = settings.api_key;
}

Amplitude.prototype.track = function(event, fn){
  const endpoint = 'httpapi'
  this.request(event, endpoint, function(err, res){
    if (err) fn(err);
    return fn(null, res);
  });
};

Amplitude.prototype.identify = function(event, fn){
  const endpoint = 'identify';
  this.request(event, endpoint, function(err, res){
    if (err) fn(err);
    return fn(null, res);
  });
};

Amplitude.prototype.request = function(event, endpoint, fn){
  const payload = JSON.stringify(map(event));
  const params = { api_key: this.api_key };

  if (event.type === 'track') params.event = payload
  if (event.type === 'identify') params.identification = payload

  request.post({
    url: `https://api.amplitude.com/${endpoint}`,
    form: params
  }, function(err, res, body){
    if (err) fn(new Error(err));
    if (res.body !== 'success') fn(new Error(res.body));
    fn(null, res.body);
  });
};

module.exports = Amplitude;
