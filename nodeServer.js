var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var servoController = require('./nodeServoController.js');

//Connection settings
var port = 13378;
var currentConnections = 0;

//Connection for controller
var controllerId;
var controllerConnected = false;

//Global log funciton for thie module
function modLog(message)
{
  console.log("NODE SERVER MODULE: " + message)
}

//Setup express server to manage http requests and website functionality
app.use(express.static('interface'));

app.get('/', function(request, response)
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

http.listen(port,function(request, response)
{
	//Report hit
	modLog("Request receive");
});

//Attempt to read in the initial values from the python server
//dataReader.updateData();

//Setup socket server side
io.sockets.on('connect', function(socket)
{
  //Set this as the first user if no current connections
  if(currentConnections == 0)
  {
    controllerId = socket.id;
  }
    currentConnections = currentConnections + 1;

    modLog("Socket connected with id of: " + socket.id);

	socket.on("broadcastMessage", function(data)
	{
		modLog("Broadcast pressed: " + data["message"]);
        io.emit("retBroadcast", data["message"]);
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
    modLog("Connection has requested a socket test: " + socket.id);

    socket.emit("test_return", function()
    {

    });
  });

  socket.on("disconnect", function()
  {
      modLog("Bye bye user: " + socket.id);
      currentConnections = currentConnections -1;

      if(socket.id == controllerId)
      {
        controllerConnected = false;
        controllerId = null;
        modLog("Controller has relinguished control, make way for the next controller.");
      }
  });

  socket.on("update_steering_servo_value", function(data)
  {
    //If this socket ID is the current socket in control of the car, update the servo
    if(socket.id == controllerId)
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
    }
    else
    {
      //Someone who is not in control has sent a command.. tsk tsk.
      modLog("Greg, fix this.. Make a funny message to the dodgy user or something...");
      socket.emit('privateMessage', "Sorry, it's not your turn to drive! You will have to wait.");
    }
  });
});

//Log Running
modLog("Listening for connections (" + port + "):");
