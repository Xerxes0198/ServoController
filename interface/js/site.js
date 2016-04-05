var socketio;

$(document).ready(function()
{
  $("#btnYeahYeah").click(function(e){
    $("#jmbHello").hide();
  })

  toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "slideDown",
  "hideMethod": "fadeOut"
  };

  //Attempt to start socket connection
  /*
  try
  {
    //Use jQuery to load in the script from a dymanically generated location    <!--Load the socket JS stuff as soon as possible -->
    //<script src="http://192.168.178.47:13378/socket.io/socket.io.js"></script>
    var serverIP = String(location.host).substring(0, String(location.host).indexOf(":"));
    var socketPort = "13378";
    var generatedServerAddress =  serverIP + ":" + socketPort;
    alert("Dymanically generated address: " + generatedServerAddress);

    $.getScript(generatedServerAddress + "/socket.io/socket.io.js", function()
    {
      //Create socket and connect to server
      //socketio = io.connect(generatedServerAddress);
    });

    /*
    socketio.on("return_data", function(data)
    {
      console.log("Server said: " + data["ServoValue"]);
      console.log("Server said: " + data["Temp"]);
      console.log("Server said: " + data);
    });
  }
  catch (e)
  {
    alert("Failed to connect to socket: " + String(e));
  }
  finally
  {

  }*/
});

function testSocket()
{
  toastr.info("Sending a test request to the socket service!");

  socketio.emit("test_socket", function(data){});

  socketio.on("test_return", function()
  {
    //ADAFS
    toastr.warning("The server hit me back! The socket is active");
  });
}
