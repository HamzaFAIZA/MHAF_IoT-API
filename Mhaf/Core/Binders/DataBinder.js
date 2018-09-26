"use strict";

var DataGroupBinder = require('./DataGroupBinder.js');

class DataBinder
{   
    constructor()
    {
        this.groups = []   
    }  
    
    setup(dataGroups)
    {
        // Create data groups binders
        for (let dataGroup of dataGroups) {
            this.groups.push(new DataGroupBinder(dataGroup));
        }
    }
    
    bindToPort(dataType, port)
    {
        // Loop through data group binders
        for (let group of this.groups) 
        {
            // Check datatype type
            if(typeof dataType == 'string')
            {
                // Try to bind datatype by name
                if(group.bindToPortByName(dataType, port))
                    break;
            }
            else 
            {
                // Try to bind datatype
                if(group.bindToPort(dataType, port))
                    break;
            }
        }    
    } 
    
    bindToCallback(dataType, callback)
    {
        // Loop through data group binders
        for (let group of this.groups) 
        {
            // Check datatype type
            if(typeof dataType == 'string')
            {
                // Try to bind datatype by name
                if(group.bindToCallbackByName(dataType, callback))
                    break;
            }
            else 
            {
                // Try to bind datatype
                //if(group.bindToPort(dataType, port))
                  //  break;
            }
        }    
    }   
    
    bindToPortAndCallback(dataType, port, callback)
    {
        // Loop through data group binders
        for (let group of this.groups) 
        {
            // Check datatype type
            if(typeof dataType == 'string')
            {
                // Try to bind datatype by name
                if(group.bindToPortAndCallbackByName(dataType, port, callback))
                    break;
            }
            else 
            {
                // Try to bind datatype
                //if(group.bindToPort(dataType, port))
                  //  break;
            }
        }    
    } 
    
    writeDataType(dataType, value)
    {
        // Loop through data group binders
        for (let group of this.groups) 
        {
            // Check datatype type
            if(typeof dataType == 'string')
            {
                // Try to bind datatype by name
                if(group.writeDataTypeByName(dataType, value))
                    break;
            }
            else 
            {
                // Try to bind datatype
                //if(group.bindToPort(dataType, port))
                    break;
            }
        }    
    }   
    
    findByName(name)
    {
        // Loop through data group binders
        for (let group of this.groups) 
        {
            // Find datatype by name
            var datatype = group.findByName(name);
            if(datatype != null)
                return datatype;           
        } 
        return null;   
    }
    
    findByDataType(datatype)
    {
        for (let group of this.groups) {
          console.log(data);
        }
    }
    
    run(networking)
    {
        // Loop through data group binders
        for (let group of this.groups) 
        {
            // Run the group
            group.run(networking);
        }
    }

}

// Export the class
module.exports = DataBinder;