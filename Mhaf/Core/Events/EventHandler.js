"use strict";

var Event = require('./Event.js');

class EventHandler
{   
    constructor()
    {
        this.events = []   
    }  
    
    registerEvent(name, callback)
    {
        // Find event by name
        var event = this.findEventByName(name);
        // Create event if it doesn't exist
        if(event == null)
            event = new Event(name);
            
        // Add callback
        event.addCallback(callback); 
        // Add to the events array
        this.events.push(event);       
    }
    
    findEventByName(name)
    {
        // Loop through events
        for (let event of this.events)
        {
            if(event.name == name)
                return event;        
        }
        return null;
    }
    
    invokeEvent(name)
    {
        // Find event by name
        var event = this.findEventByName(name);
        // Invoke event if its not null
        if(event != null)
            event.invoke();
    }

}

// Export the class
module.exports = EventHandler;