"use strict";

var URLs = require('./URLs.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class Networking
{
  constructor()
  {
      // Create xml http request instance
      this.xmlHttpRequest = new XMLHttpRequest();
  }    
  
  send(method, url, params, onNetworkSuccess, onNetworkError) 
  {
	    // Open connection to the URL
	    this.xmlHttpRequest.open(method, url + "?" + params, false);
      // Set request header
	    this.xmlHttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      this.xmlHttpRequest.setRequestHeader("Access-Control-Allow-Origin","*")
      // Set the state change listener
      var httpRequest = this.xmlHttpRequest;
	    this.xmlHttpRequest.onreadystatechange = function() {
         
        // Did we receive a success ?
		    if(httpRequest.readyState == 4 && httpRequest.status == 200) 
        {
            if(onNetworkSuccess != null)
                onNetworkSuccess(httpRequest.responseText);  
		    }
        else if(httpRequest.readyState == 4)
        {
            if(onNetworkError != null)
                onNetworkError(httpRequest.status);
        }
	    }
      // Send request
	    this.xmlHttpRequest.send();  
  }
   
  sendNoResult(method, url, params) 
  {
      this.send(method, url, params, null, null);
  }
}

// Export the class
module.exports = Networking;