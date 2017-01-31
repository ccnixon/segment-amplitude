const assert = require('assert');
const Amplitude = require('../lib');
const api_key = '02b7c45f64412b95ddea9f1ed5d1c6c4'
const events = require('./fixtures');


const amplitude = new Amplitude({ api_key: api_key });

describe('Amplitude', function(){

  describe('#track', function(){
    it('should successfully send Segment track events', function(done){
      amplitude.track(events.track, function(err, res){
        if (err){
          console.log(err);
          return done(err);
        }
        done();
      })
    })
  })

  describe('#identify', function(){
    it('should successfully send Segment identify events', function(done){
      amplitude.identify(events.identify, function(err, res){
        if (err){
          console.log(err);
          return done(err);
        }
        done();
      })
    })
  })
})
