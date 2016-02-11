//Read in the values from the python server and provite Functions for the node server
var fs = require('fs');
var nodeServo = require('./nodeServo.js');

//Create servo values
var SERVO_FOLDER = 'servoValues/';

/*
Default servo configuration
Pin 0 = Steering Servo - Will change later

*/

var servos = [];

function modLog(message)
{
  console.log("DATA READER MODULE: " + message)
}

//Function to get a servo based on the name of it
this.getServo = function(inStringName)
{
  var retVal = null;

  for(i = 0; i < servos.length; i++)
  {
    if(servos[i].getName() == inStringName)
    {
      retVal = i;
    }
  }

  if(retVal == null)
  {
    return null;
  }
  else
  {
    return retVal;
  }
}

//Function to update a requested server if it exists
this.updateServo = function(inServoName, inNewValue)
{
  //Check to see if the servo exists and pass it the new value
  //Value will always be in a range of 0 to 100, the limits
  //of th ephysical servo are managed in the servo class.
  servoNum = this.getServo(inServoName);

  if(servoNum == null)
  {
    console.log("A servo search was done but no servo was found: " + inServoName);
  }
  else
  {
    servos[servoNum].updateValue(inNewValue);
  }
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
