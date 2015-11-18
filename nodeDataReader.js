//Read in the values from the python server and provite Functions for the node server

var fs = require('fs');

var readData;
var inputFileName = 'piValues.txt';
var dataReaderEnabled = true;

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
  });
}

modLog("Node Data Reader instantiated...");
this.readInitData();
