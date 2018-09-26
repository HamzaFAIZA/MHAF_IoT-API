"use strict";

var DeviceTemplate = require('./DeviceTemplate.js');

class DeviceData
{
  constructor(data) 
  {
      // Set data
      this.name = data.name; 
      this.longitude = data.longitude; 
      this.latitude = data.latitude; 
      // Create device template instance
      this.deviceTemplate = new DeviceTemplate(data.template);
  }
}

// Export the class
module.exports = DeviceData;