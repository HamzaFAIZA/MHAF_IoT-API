"use strict";

var DataGroup = require('./DataGroup.js');

class DeviceTemplate
{
  constructor(data) 
  {
      // Set data
      this.name = data.name; 
      this.ping_time = data.ping_time; 
      this.ping_unit = data.ping_unit; 
      // Loop through the data groups
      this.dataGroups = [];
      for (let dataGroup of data.datagroups) 
      {
        // Create data group instance
        this.dataGroups.push(new DataGroup(dataGroup));
      }
  }
}

// Export the class
module.exports = DeviceTemplate;