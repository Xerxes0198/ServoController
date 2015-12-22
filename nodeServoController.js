//Read in the values from the python server and provite Functions for the node server
var fs = require('fs');
var nodeServo = require('./nodeServo.js');

//Create servo values
var SERVO_FOLDER = 'servoValues/';

var servos = [];

function modLog(message)
{
  console.log("DATA READER MODULE: " + message)
}

//Read all servo values and create a servo object
this.readInitData = function()
{
  //Read all files
  files = fs.readdirSync(SERVO_FOLDER);
  for(file in files)
  {
    //Create a new servo for each file found
    servos.push(new nodeServo(SERVO_FOLDER + files[file]));
  }
}

modLog("Node Data Reader instantiated...");
this.readInitData();
