"use strict";

var Networking = require('./../Network/Networking.js');
var URLs = require('./../Network/URLs.js');
var DeviceData = require('./../Models/DeviceData.js');
var DataBinder = require('./Binders/DataBinder.js');
var EventHandler = require('./Events/EventHandler.js');
var AsyncTask = require('./Utilities/AsyncTask.js');
var TimeConverter = require('./Utilities/TimeConverter.js');

const connectionSuccessEvent = "connectionSuccess";

class Core
{
  constructor()
  {
      // Create instances 
      this.networking = new Networking();
      this.dataBinder = new DataBinder();
      this.eventHandler = new EventHandler();
      // Reset properties
      this.deviceTemplate = null;
      this.pingTask = null;
  }

  connect(id) 
  {
      // Save the device id
      this.id = id;
      // Preserve the context
      var context = this;
      // Send a connection request
      this.networking.send("GET", URLs.devices_connect, "id=" + id, 
          // On success
          function (data) {
              // Handle connection success
              context.onConnectionSuccess(data);
          }
          , 
          // On error
          function (status) {
              console.log("fail: " + status);
      }); 
  }
  
  // When connection request succeeds
  onConnectionSuccess(data)
  {
      // Parse JSON data
      var parsedData = JSON.parse(data);
      // Create device data instance
      this.deviceData = new DeviceData(parsedData);
           
      // Setup data binder
      this.dataBinder.setup(this.deviceData.deviceTemplate.dataGroups);
      
      // Get the ping time
      var time = TimeConverter.stringToMs(this.deviceData.deviceTemplate.ping_unit, this.deviceData.deviceTemplate.ping_time);
      // Create the ping task
      this.pingTask = new AsyncTask();
      // Setup and run the ping task
      this.pingTask.addParameter(this.networking);
      this.pingTask.addParameter(this.id);
      this.pingTask.run(time, this.ping);
      
      // Run data binder
      this.dataBinder.run(this.networking);
  
      // Invoke connextion success event
      this.eventHandler.invokeEvent(connectionSuccessEvent);
  }
  
  sendData() 
  {
      
      /*var id = this.deviceTemplate.dataGroups[0].dataTypes[0].id;
      var value = Math.floor(Math.random() * Math.floor(30));
      console.log("sending: " + value);
      var params = "id=" + id + "&value=" + value;// + "&device_id=5aba698468f5c64ce00028e4";
      this.networking.send("GET", url, params, 
      // On success
      function (data) {
          var parsedData = JSON.parse(data);
          if(parsedData.length != 0)
          {
            for(var i = 0; i < parsedData.length; i++)
            {  
              var myLed = new mraa.Gpio(13); //LED hooked up to digital pin 13 (or built in pin on Galileo Gen1 & Gen2)
              myLed.dir(mraa.DIR_OUT); //set the gpio direction to output
              if(parsedData[i].message == "led")
              {
                //console.log("message: " + parsedData[i].message);
                myLed.write(1);
              }  
              else
              {
                myLed.write(0);
                console.log("message: " + parsedData[i].message);
              }   
              
            }
          }
      }
      , 
      // On error
      function (status) {
          console.log("fail: " + status);
          
      }); */
  }
  
  receiveData()
  {
      // Send a connection request
      this.networking.send("GET", "http://172.16.18.147:8000/devices_sync", "id=" + "5aba552f68f5c625f8001442", 
      // On success
      function (data) {
          // Parse JSON data
          var parsedData = JSON.parse(data);
          if(parsedData.length != 0)
          {
                      
            console.log("value: " + parsedData[0].value);
          }
      }
      , 
      // On error
      function (status) {
          console.log("fail: " + status);
          
      }); 
  }
  
  // Ping request callback
  ping(parameters)
  {
      // Send a connection request
      parameters[0].send("GET", URLs.devices_ping, "id=" + parameters[1], 
          // On success
          function (data) {
              console.log("success: " + data);                
          }
          , 
          // On error
          function (status) {
              console.log("fail: " + status);          
      });
  }
  
  /* */
  bindToPort(dataType, port) 
  {
      this.dataBinder.bindToPort(dataType, port);   
  }
  
  bindToCallback(dataType, callback) 
  {
      this.dataBinder.bindToCallback(dataType, callback);   
  }
  
  bindToPortAndCallback(dataType, port, callback) 
  {
      this.dataBinder.bindToPortAndCallback(dataType, port, callback);   
  }
  
  writeDataType(dataType, value) 
  {
      this.dataBinder.writeDataType(dataType, value);   
  }
  
  registerEvent(event, callback)
  {
      // Register event
      this.eventHandler.registerEvent(event, callback);
  }
}

// Export the class
module.exports = Core;