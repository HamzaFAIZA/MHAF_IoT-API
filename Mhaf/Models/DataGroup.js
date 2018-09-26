"use strict";

var DataType = require('./DataType.js');

class DataGroup
{
    constructor(data)
    {
        this.name = data.name;
        this.time = data.time;
        this.unit = data.unit;
        // Loop through the data groups
        this.dataTypes = [];
        for (let dataType of data.datatypes) 
        {
            // Create data type instance
            this.dataTypes.push(new DataType(dataType));
        }
    }
}

// Export the class
module.exports = DataGroup;