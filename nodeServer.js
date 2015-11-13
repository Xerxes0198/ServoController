var http = require('http');
var fs = require('fs');

//Connection settings
var port = 13378;

var app = http.createServer(function(request, response)
{
	//Report hit
	console.log("Request receive");

	//Read in the HTML Interface
	fs.readFile("interface/index.html", "utf-8", function(error, data)
	{
		console.log("File read:" + data);
		console.log("Error Reads: " + error)

		if(error == null)
		{
			response.writeHead(200, {'Content-Type' : 'text/html'})
			response.write(data);
			response.end();
		}
	});

}).listen(port);

//Setup socket server side
var io = require('socket.io').listen(app);

io.sockets.on('connect', function(socket)
{
	socket.on("btn_pressed", function(data)
	{
		console.log("Button pressed: " + data["DummyData"]);
	});
});


//Log Running
console.log("Listening for connections (" + port + "):");
