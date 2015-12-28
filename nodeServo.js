var fs = require('fs');
var util = require('util');

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

  //Output all data to console
  this.logToConsole = function()
  {
    console.log("servo_pin: "     + String(this.servo_pin));
    console.log("servo_min: "     + String(this.servo_min));
    console.log("servo_max: "     + String(this.servo_max));
    console.log("servo_current: " + String(this.servo_current));
  }

  //Update the value of this servo
  this.updateValue = function(newVal)
  {
    try
    {
      var v = parseInt(newVal);
      console.log("New input value: " + String(v));
      var calc = parseFloat(this.servo_max - this.servo_min);
      calc = calc * (v / 100);
      calc = parseFloat(calc) + parseFloat(this.servo_min);
      this.servo_current = calc;
      this.logToConsole();

      this.writeNewValue(calc);
    }
    catch (e)
    {
      console.log("Updating new servo value failed");
      console.log(e);
    }
  }

  //Function to return servo's name for rough ID
  this.getName = function()
  {
    return String(FILE_PATH).split("/")[1];
  }

  this.writeNewValue = function(newVal)
  {
    //Write the new values to the file in the same order they were read... Just do this manually.
    fs.writeFile(FILE_PATH, util.format('%s:%s:%s:%s',
                              this.servo_pin,
                              this.servo_min,
                              this.servo_max,
                              this.servo_current),
                              function(err)
    {
      console.log("Error writing: " + err);
    });

    //Formatted string test
    console.log(util.format('Teset %s', 'Here is S'));
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
