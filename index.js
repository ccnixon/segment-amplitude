const map = require('./lib/mapper.js');
const request = require('request');

const Amplitude = function(settings){
  this.api_key = settings.api_key;
}

/*

Sends a Segment formatted event to Amplitude. Amplitude api endpoint is determined based on
Segment event type (track or identify)

@param {Object} event - Segment event data
@param {Function} fn  - Callback function invoked on save or on error to Amplitude
 */

Amplitude.prototype.send = function(event, fn){
  var eventType = event.type;
  if (!event.userId || !event.context.device.id) return fn(new Error('userId or deviceId are required fields'))
  if (!this[eventType]) return fn(new Error(`Segment event type: ${eventType} not supported.`));
  this[eventType](event, function(err, res){
    if (err) return fn(err);
    fn(null, res);
  })
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
