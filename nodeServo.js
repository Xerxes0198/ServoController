var fs = require('fs');

//Define the servo class for JS
module.exports = function nodeServo(inFilePath)
{
  var FILE_PATH = inFilePath;

  var servo_pin     = 0;
  var servo_min     = 0;
  var servo_max     = 0;
  var servo_current = 0;

  //Define servo functions

  //Update vailes from file
  this.updateFromFile = function()
  {
    //Read in the file
    var values = String(fs.readFileSync(FILE_PATH)).split(":");
    this.servo_pin       = values[0];
    this.servo_min       = values[1];
    this.servo_max       = values[2];
    this.servo_current   = values[3];
  }

  this.writeNewValue = function()
  {
    //Write the new values to the file in the same order they were read... Just do this manually.
  }

  /////////////////////////////////////////////
  //Constructor and Constructor call
  //Create the servo with the found servo file
  /////////////////////////////////////////////
  this.initiateServo = function()
  {
    console.log("Initiating new servo for file: " + FILE_PATH);
    this.updateFromFile();
  }

  //Call the initial method
  this.initiateServo();
};
