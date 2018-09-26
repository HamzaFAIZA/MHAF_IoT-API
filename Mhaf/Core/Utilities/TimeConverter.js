"use strict";

class TimeConverter
{   
    /*
        Will convert a value and unit given string to milliseconds
        
        Parameters:
            - unit: string (hours, minutes, seconds)
            - value: the unit value
    */
    static stringToMs(unit, value)
    {
        switch(unit.toUpperCase())
        {
            case "SECOND":
                return value * 1000;
                
            case "MINUTE":
                return value * 60000;
                
            case "HOUR":
                return value * 3600000;
        }   
        
        return value; 
    }
}

// Export the class
module.exports = TimeConverter;