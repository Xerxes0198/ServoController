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
    console.log("A servo search was done but no servo was found: " + inStringName);
  }
  else
  {
    return retVal;
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
