var http = require('http');
var fs = require('fs');
var dataReader = require('./nodeDataReader.js');

//Connection settings
var port = 13378;

//Global log funciton for thie module
function modLog(message)
{
  console.log("NODE SERVER MODULE: " + message)
}

var app = http.createServer(function(request, response)
{
	//Report hit
	modLog("Request receive");

	//Read in the HTML Interface
	fs.readFile("interface/index.html", "utf-8", function(error, data)
	{
		modLog("File read:" + data);
		modLog("Error Reads: " + error)

		if(error == null)
		{
			response.writeHead(200, {'Content-Type' : 'text/html'})
			response.write(data);
			response.end();
		}
	});

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
    var readString = dataReader.updateData();
    console.log(dataReader.updateData());
    io.sockets.emit("return_data", readString)
	});
});

//Log Running
modLog("Listening for connections (" + port + "):");
