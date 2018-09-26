"use strict";

class DataType
{
    constructor(data)
    {
        this.id = data.id;
        this.name = data.name;
        this.unit = data.unit;
        this.type = data.type;
        this.access = data.access;
    }
}

// Export the class
module.exports = DataType;