var http = require('http');
var fs = require('fs');

//Connection settings
var port = 13378;

var app = http.createServer(function(request, response)
{
	//Report hit
	console.log("Request receive");

	//Read in the HTML Interface
	fs.readFile("HTMLInterface/index.html", "utf-8", function(error, data)
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


//Log Running
console.log("Listening for connections (" + port + "):");
