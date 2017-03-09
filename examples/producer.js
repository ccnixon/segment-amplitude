const Amplitude = require('../');
const amplitude = new Amplitude({api_key: '4e3df7bd447077d4cb94eecc102ea185'});
const events = require('../events.json');

for (var i = 0; i < events.length; i++){
  if (events[i].type === 'identify') continue;
  amplitude.send(events[i], function(err, res){
    if (err) console.log(err);
    console.log(res);
  });  
}


