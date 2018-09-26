express = require('express');
const mraa = require("mraa");
//var DeviceTemplate = require('./DeviceTemplate.js');
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var Mhaf = require('./Mhaf/Mhaf.js');
//var Cylon = require('cylon');
//var deviceTemplate;

var app = express();
var mhaf = new Mhaf();
var port=3000
app.set('port', process.env.PORT || port);

var state = 0;

function onConnectionSuccess()
{
    console.log("gooood");
    // Bind datatypes
    mhaf.bindToPort("sound", 0);
    mhaf.bindToPortAndCallback("temperature", 1, calculateTemp);
    mhaf.bindToCallback("light", getLight);
    
    // Bind writing datatypes
    mhaf.bindToPort("led", 13);
}

app.listen(app.get('port'), function () {
    console.log('Bot is running on port ',app.get('port'));
    // Register events
    mhaf.registerEvent(Mhaf.connectionSuccessEvent, onConnectionSuccess);
    // Connect the device
    mhaf.connect("5b079a1979558d0ca000502e");
    
});

function getLight()
{
    if(state == 0)
      state = 1;
    else
      state = 0;
      
    mhaf.writeDataType("led", state);
    /*var buzz = new mraa.Gpio(3);
    buzz.dir(mraa.DIR_OUT);
    buzz.write(1);*/
    var analogPin = new mraa.Aio(2);
    return analogPin.read();    
}

function calculateTemp(value)
{
    return (value - 32) * 5 / 9;  
}
  