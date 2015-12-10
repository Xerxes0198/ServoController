//Read in the values from the python server and provite Functions for the node server
var fs = require('fs');
var fs = require('pythonServo');

//Create servo values
var SERVO_FOLDER = 'servoValues/';

var servos = [];

function modLog(message)
{
  console.log("DATA READER MODULE: " + message)
}

this.writeSteeringValue = function(newVal)
{
  modLog("Attempting to write given data to FS");

  fs.writeFile(servoFileName, newVal);
}

//Read all servo values and create a servo object
this.readInitData = function()
{
  //Read all files
  files = fs.readdirSync(SERVO_FOLDER).forEach(function(file)
  {
    modLog(fs.readFileSync(SERVO_FOLDER + file.replace('\n', '')));
  });
}

modLog("Node Data Reader instantiated...");
this.readInitData();
