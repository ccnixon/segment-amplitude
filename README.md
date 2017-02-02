## Overview

Lightweight Amplitude SDK in Node for usage with Segment events.

## Installation

```
$ git clone https://github.com/ccnixon/segment-amplitude
$ cd segment-amplitude
$ npm install
```

Next, create a .env file in the root directory of the repo. Into the new file, put the following:

`API_KEY=<AMPLITUDE-API-KEY>`

After you have added this, run `npm test` to run the test suite.

### Usage

Events can be added for testing in the `./test/fixtures` directory.

The easiest way to quickly use the API is to add it as a dependency to a node project:

`npm install https://github.com/ccnixon/segment-amplitude`

Example Usage:

```js
const Amplitude = require('segment-amplitude');
const amplitude = new Amplitude('AMPLITUDE-API-KEY');
const event = require('./segment-event.json');

amplitude.send(event, function(err, res){
  if (err) console.log(err);
  else return res;
});
```

### API

####`.send(event, fn)`

Sends an event to Amplitude's API. Event must contain a property `type` that is either identify (for access to Amplitudes `identify`) endpoint or `track` (which will access Amplitudes `httpapi` endpoint).

Event object must contain either a userId or deviceId field. Reference mapping below.

### Property Mapping

Fields are mapped to the Amplitude API based on the Segment spec. Here is the full mapping where the keys are the Amplitude keys and the properties are the expected equivalent Segment event property

```
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
```






