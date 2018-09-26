"use strict";

class Event
{   
    constructor(name)
    {
        this.name = name;
        this.callbacks = []   
    }  
    
    addCallback(callback)
    {
        // Add callback
        this.callbacks.push(callback);        
    }
    
    invoke()
    {
        // Loop through callbacks
        for (let callback of this.callbacks)
        {
           // Invoke the callback
           callback();        
        }
    }

}

// Export the class
module.exports = Event;