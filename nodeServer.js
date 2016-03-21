var http = require('http');
var express = require('express');
var fs = require('fs');
var servoController = require('./nodeServoController.js');

//Connection settings
var expressPort = 8080;
var port = 13378;

//Global log funciton for thie module
function modLog(message)
{
  console.log("NODE SERVER MODULE: " + message)
}


//Setup express server to manage http requests and website functionality
var expressApp = express();
expressApp.use(express.static('interface'));
expressApp.get('/', function(request, response)
{
  //Read in the HTML Interface
  fs.readFile("interface/index.html", "utf-8", function(error, data)
  {
    //modLog("File read:" + data);
    modLog("Error Reads: " + error)

    if(error == null)
    {
      response.writeHead(200, {'Content-Type' : 'text/html'})
      response.write(data);
      response.end();
    }
	});
});
expressApp.listen(expressPort);

var app = http.createServer(function(request, response)
{
	//Report hit
	modLog("Request receive");
}).listen(port);

//Attempt to read in the initial values from the python server
//dataReader.updateData();

//Setup socket server side
var io = require('socket.io').listen(app);

io.sockets.on('connect', function(socket)
{
	socket.on("btn_pressed", function(data)
	{
		modLog("Button pressed: " + data["DummyData"]);
    //var readString = dataReader.updateData();
    //console.log(dataReader.updateData());
    //io.sockets.emit("return_data", readString)
	});

  //Create a function to request initial values
  socket.on("request_initial_values", function(data)
  {
    //Request received for init values
    modLog("Request received for init values");

    //Read init data and return it to new socket connection.
    servoController.readInitData();
  });


  socket.on("test_socket", function()
  {
    socket.emit("test_return", function()
    {

    });
  });

  socket.on("update_steering_servo_value", function(data)
  {
    var newVal = parseInt(data);
    if(Number.isInteger(newVal))
    {
      if(newVal <= 100 && newVal > 0)
      {
        modLog("Updateing steering servo to value: " + data);

        //Write this value to the FS
        //FIX Harcoding of servo name is probably not best..
        servoController.updateServo("steering_servo", data);
      }
      else
      {
        //An invalid value has been passed through the socket connection...
        modLog("A bad value was passed to the server! Ignore input.");

        //Destroy connection??
      }
    }
  });
});

//Log Running
modLog("Listening for connections (" + port + "):");
