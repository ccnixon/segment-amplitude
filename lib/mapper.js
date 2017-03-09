const _ = require('lodash');

const map = function(event){
  const reservedWords = ['timestamp', 'userId', 'context', 'messageId', 'type', 'event', 'properties'];
  const payload = {};
  event.properties = {};
  
  // Build custom properties object by pulling any key/value pairs that have been defined by the user, not the Segment API per their spec.
  // This is necessary because custom property key value pairs are not stored in their own data structure.
  // The key/value pairs are interspersed throughout the payload.
  for (key in event){
    if (!reservedWords.includes(key)){
      event.properties[key] = event[key];
    }
  }

  // Establish an event naming dictionary. This would be defined in a UI and stored as a JSON object in a further iteration.
  // This map defines which Amplitude parameters would be equivalent to possible standard Segment event parameters.
  const eventMapping = {
    user_id          : 'userId',
    device_id        : 'context.device.id',
    time             : 'timestamp',
    app_version      : 'context.os.version',
    os_name          : 'context.os.name',
    os_version       : 'context.os.version',
    device_brand     : 'context.network.carrier',
    device_manufacturer : 'context.device.manufacturer',
    device_model     : 'context.device.model',
    device_type      : 'context.device.type',
    carrier          : 'context.network.carrier',
    country          : 'context.location.country',
    region           : 'context.location.region',
    city             : 'context.location.city',
    dma              : 'context.location.dma',
    language         : 'properties.language',
    price            : 'properties.price',
    quantity         : 'properties.quantity',
    revenue          : 'properties.revnue',
    productId        : 'properties.product_id',
    revenueType      : 'properties.revenueType',
    location_lat     : 'context.location.latitude',
    location_lng     : 'context.location.longitude',
    ip               : 'context.ip',
    paying           : 'properties.paying'
  };


  // Check to see if mapped key names are present in the event. If so, add the corresponding value to the payload.
  for (key in eventMapping){
    // _.get retrieves the value at the path of an object passed in as a string.
    // https://lodash.com/docs/4.17.4#get
    const prop = _.get(event, eventMapping[key]);
    if (prop){
      payload[key] = prop;
    }
  };

  // Add some final modifications to handle Amplitude nuiances.
  // These are 'unmappable' differences between the Amplitude API and the Segment data spec.
  payload.time = new Date(event.timestamp).getTime();
  payload.platform = 'iOS';

  if (_.get(event, 'event.context.device.manufacturer') === 'Apple') {
    payload.idfa = event.context.device.advertisingId;
    payload.platform = 'iOS';
  };

  if (_.get(event, 'event.context.device.manufacturer') === 'Android') {
    payload.adid = event.context.device.advertisingId;
    payload.platform = 'Android';
  };

  // Add the custom properties to either the event_properties object or the user_properties 
  // object based on whether it is a track event or an identify event.
  if (event.type === 'track'){
    payload.event_properties = event.properties;
    payload.event_type = event.event;
  }
  
  if (event.type === 'identify'){
    payload.user_properties = event.properties;
  }

  return payload;
}

module.exports = map;
