const assert = require('assert');
const Amplitude = require('../');
const api_key = '02b7c45f64412b95ddea9f1ed5d1c6c4'
const events = require('./fixtures');


const amplitude = new Amplitude({ api_key: api_key });

describe('Amplitude', function(){

  it('should send an error message if the Segment event type is no supported', function(done){
    var event = Object.assign({}, events.track);
    event.type = 'foobar';
    amplitude.send(event, function(err, res){
      assert(err !== null);
      done();
    });
  });

  it('should return an error if userId or deviceId are not included', function(done){
    var event = Object.assign({}, events.identify)
    delete event.userId;
    amplitude.send(event, function(err, res){
      assert(err !== null);
      done();
    });
  });

  describe('#track', function(){
    it('should successfully send Segment track events', function(done){
      amplitude.send(events.track, function(err, res){
        if (err){
          console.log(err);
          return done(err);
        }
        assert.equal(res, 'success');
        done();
      });
    });
  });

  describe('#identify', function(){
    it('should successfully send Segment identify events', function(done){
      amplitude.send(events.identify, function(err, res){
        if (err){
          console.log(err);
          return done(err);
        }
        assert.equal(res,'success');
        done();
      });
    });
  });
});
