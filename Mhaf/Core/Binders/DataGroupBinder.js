"use strict";

var DataBind = require('./DataBind.js');
var AsyncTask = require('./../Utilities/AsyncTask.js');
var TimeConverter = require('./../Utilities/TimeConverter.js');

class DataGroupBinder
{   
    constructor(dataGroup)
    {
        this.datas = []   
        // Create data binds
        for (let data of dataGroup.dataTypes) {
            this.datas.push(new DataBind(data));
        }
        // Reset instances
        this.task = null;
        // Calculate time
        this.time = TimeConverter.stringToMs(dataGroup.unit, dataGroup.time);
    }  
    
    bindToPortByName(name, port)
    {
        // Loop through data binds
        for (let data of this.datas) 
        {
            // Compare names
            if(data.dataType.name == name)
            {
                // Bind to port
                data.bindToPort(port);
                return true;
            }
        }   
        return false; 
    }  
    
    bindToCallbackByName(name, callback)
    {
        // Loop through data binds
        for (let data of this.datas) 
        {
            // Compare names
            if(data.dataType.name == name)
            {
                // Bind to callback
                data.bindToCallback(callback);
                return true;
            }
        }   
        return false; 
    }  
    
    bindToPortAndCallbackByName(name, port, callback)
    {
        // Loop through data binds
        for (let data of this.datas) 
        {
            // Compare names
            if(data.dataType.name == name)
            {
                // Bind to port and callback
                data.bindToPortAndCallback(port, callback);
                return true;
            }
        }   
        return false; 
    }  
    
    writeDataTypeByName(name, value)
    {
        // Loop through data binds
        for (let data of this.datas) 
        {
            // Compare names
            if(data.dataType.name == name)
            {
                // Bind to port and callback
                data.write(value);
                return true;
            }
        }   
        return false; 
    }  
    
    run(networking)
    {
        // Create task
        this.task = new AsyncTask();
        // Setup task
        this.task.addParameter(this);
        this.task.addParameter(networking);
        this.task.run(this.time, this.update);    
    }
    
    update(parameters)
    {
        // Get context
        var context = parameters[0];
        var networking = parameters[1];
        // Loop through data binds
        for (let data of context.datas) 
        {
            // Update data
            data.update(networking);
        }
    }

}

// Export the class
module.exports = DataGroupBinder;