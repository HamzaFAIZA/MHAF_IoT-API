"use strict";

var Core = require('./../Core.js');
var URLs = require('./../../Network/URLs.js');

const mraa = require("mraa");

var BindType = {
  TYPE_TO_PORT : {value: 0, name: "Bind to port", code: "S"}, 
  TYPE_TO_CALLBACK: {value: 1, name: "Bind to callback", code: "M"}, 
  TYPE_TO_PORT_WITH_CALLBACK : {value: 2, name: "Bind to port with callback", code: "L"}
};

class DataBind
{    
    constructor(dataType)
    {
        this.dataType = dataType;  
        this.binded = false; 
    }  
    
    bindToPort(port)
    {
        this.bindType = BindType.TYPE_TO_PORT;   
        this.port = port; 
        this.binded = true;
        // Create the pin
        if(this.isReadAccess())
            this.pin = new mraa.Aio(port);
        else
        {
            this.pin = new mraa.Gpio(port);
            this.pin.dir(mraa.DIR_OUT);
        }
    } 
    
    bindToCallback(callback)
    {
        if(this.isReadAccess())
        {
            this.bindType = BindType.TYPE_TO_CALLBACK;   
            this.callback = callback;
            this.binded = true; 
        }
    }  
    
    bindToPortAndCallback(port, callback)
    {
        if(this.isReadAccess())
        {
            this.bindType = BindType.TYPE_TO_PORT_WITH_CALLBACK;   
            this.port = port; 
            this.callback = callback; 
            this.binded = true;
            // Create the analog pin reader
            this.pin = new mraa.Aio(port);
        }
    }   
    
    isReadAccess()
    {
        return this.dataType.access == 0;
    }
    
    update(networking)
    {
        // Are we binded
        if(this.binded && this.isReadAccess())
        {
            // Read based on type
            var value = null;
            switch(this.bindType)
            {
                case BindType.TYPE_TO_PORT:
                    // Read our value
                    value = this.pin.read();
                    console.log("port: " + value);
                    break;
                    
                case BindType.TYPE_TO_CALLBACK:
                    // Invoke the callback
                    value = this.callback();
                    console.log("callback: " + value);
                    break;
                    
                case BindType.TYPE_TO_PORT_WITH_CALLBACK:
                    // Read our value
                    value = this.pin.read();
                    // Invoke the callback
                    value = this.callback(value);
                    console.log("callback and port: " + value);
                    break;
            
            }
            
            // Create parameters string
            var params = "id=" + this.dataType.id + "&value=" + value;
            // Send value
            networking.send("GET", URLs.devices_data, params, 
                // On success
                function (data) {
                    console.log("data sent");
                }
                , 
                // On error
                function (status) {
                    console.log("data fail: " + status);
                    
                });
            
        }
    }  
    
    write(value)
    {
        // Are we binded ?
        if(this.binded && !this.isReadAccess())
            this.pin.write(value);
    }
}

// Export the class
module.exports = DataBind;