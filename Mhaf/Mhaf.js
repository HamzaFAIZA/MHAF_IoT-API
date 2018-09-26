"use strict";

var Core = require('./Core/Core.js');

const connectionSuccessEvent = "connectionSuccess";

class Mhaf
{
  constructor()
  {
      // Create the core instance 
      this.core = new Core();
  }

  connect(id) 
  {
      // Invoke core's connect
      this.core.connect(id);
  }
  
  bindToPort(dataType, port) 
  {
      this.core.bindToPort(dataType, port);   
  }
  
  bindToCallback(dataType, callback) 
  {
      this.core.bindToCallback(dataType, callback);   
  }
  
  bindToPortAndCallback(dataType, port, callback) 
  {
      this.core.bindToPortAndCallback(dataType, port, callback);   
  }
  
  writeDataType(dataType, value)
  {
      this.core.writeDataType(dataType, value);
  }
  
  registerEvent(event, callback)
  {
      // Register event
      this.core.registerEvent(event, callback);
  }
  
  static get connectionSuccessEvent() {
      return connectionSuccessEvent;
  } 
}

// Export the class
module.exports = Mhaf;