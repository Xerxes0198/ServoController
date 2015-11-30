//Read in the values from the python server and provite Functions for the node server

var fs = require('fs');

var readData;
var inputFileName = 'piValues.txt';
var dataReaderEnabled = true;

//Create servo values
var FILE_STEERING_SERVO = '/servoValues/steering_servo';

function modLog(message)
{
  console.log("DATA READER MODULE: " + message)
}

this.updateData = function()
{
  returnData = null;
  returnData = fs.readFileSync(inputFileName);
  return returnData;
}

this.writeSteeringValue = function(newVal)
{
  modLog("Attempting to write given data to FS");

  fs.writeFile(servoFileName, newVal);
}

//Functions to read values
this.readSteeringValue = function()
{
  //Return steering valie from file
  //Format of <Io:VALUE>

  //Check file exists
  //  Try
  //    Read in values and split on ':'
  //  try converting to JSON as {pin:"<PIN NUMBER>", value:"<Read Value>"}
  //Return JSON object, or return null!
}

this.readThrottleValue = function()
{
  //Return throttle valie from file
  //Format of <Io:VALUE>

  //Convert to JSON

  //Return JSON
}

this.readInitData = function()
{
  modLog("Reading initial JSON data from python server...")

  fs.readFile(inputFileName, function(error, data)
  {
    if(error != null)
    {
      modLog("Logging error from piValues read: " + error);
      modLog("Can't find input data from node server!")
      modLog("Disabling data reader module")

      //Disable this module as no input will work
      dataReaderEnabled = false;
    }
    else
    {
      modLog("Data Reader initialized correctly...");
      modLog("Logging data from piValues read: " + data);
    }

    //Read in the current values of the servos

  });
}

modLog("Node Data Reader instantiated...");
this.readInitData();
