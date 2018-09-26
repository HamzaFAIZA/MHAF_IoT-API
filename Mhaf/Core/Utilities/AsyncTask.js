"use strict";

class AsyncTask
{   
    constructor()
    {
        // Reset properties
        this.hasParameters = false;
        this.parameters = [];   
        this.timer = null;
    }  
    
    addParameter(parameter)
    {
        // Set the has parameters flag
        this.hasParameters = true; 
        // Append the current parameter
        this.parameters.push(parameter);    
    }  
    
    run(interval, callback)
    {
        // Preserve the context
        var context = this;
        // Start an interval timer
        this.timer = setInterval(function () {
            // Do we have parameters ?
            if(context.hasParameters)
                // Invoke paramtered callback
                callback(context.parameters);
            else
                // Invoke empty callback
                callback();
                
        }, interval);
    }
    
    stop()
    {
        // Kill the interval if its not null
        if(this.timer != null)
            clearInterval(this.timer);
    }
}

// Export the class
module.exports = AsyncTask;