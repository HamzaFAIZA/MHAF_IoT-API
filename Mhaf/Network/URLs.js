"use strict";

const address = "http://192.168.43.161:8000";
const devices_connect = address + "/devices_connect";
const devices_senddata = address + "/devices_data";
const devices_ping = address + "/devices_ping";
const devices_data = address + "/devices_data";

class URLs
{
    static get address() {
      return address;
    }   
    
    static get devices_connect() {
      return devices_connect;
    }  
    
    static get devices_send_data() {
      return devices_senddata;
    }
    
    static get devices_ping() {
      return devices_ping;
    }  
    
    static get devices_data() {
      return devices_data;
    }  
}

// Export the class
module.exports = URLs;