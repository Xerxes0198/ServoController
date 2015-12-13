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

    //Split the file on colons

    //write values to local vaules
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
