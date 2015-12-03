//Read in the values from the python server and provite Functions for the node server

var fs = require('fs');

var readData;
var inputFileName = 'piValues.txt';
var dataReaderEnabled = true;

//Create servo values
var SERVO_FOLDER = 'servoValues/';

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

//Read all servo values and create a servo object
this.readInitData = function()
{
  files = fs.readdirSync(SERVO_FOLDER).forEach(function(file)
  {
    modLog(fs.readFileSync(SERVO_FOLDER + file.replace('\n', '')));
  });
}

modLog("Node Data Reader instantiated...");
this.readInitData();
