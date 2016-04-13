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
  try
  {
    socketio = io();

    socketio.on("return_data", function(data)
    {
        console.log("Server said: " + data["ServoValue"]);
        console.log("Server said: " + data["Temp"]);
        console.log("Server said: " + data);
    });

    socketio.on("retBroadcast", function(message)
    {
        toastr.info("BROADCAST: " + message);
    });
  }
  catch (e)
  {
    alert("Failed to connect to socket: " + String(e));
  }
  finally
  {

  }

});

function testSocket()
{
  toastr.info("Sending a test request to the socket service!");

  socketio.emit("test_socket", function(data){});

  socketio.on("test_return", function()
  {
    //ADAFS
    toastr.success("The server hit me back! The socket is active");
  });
}

function broadcastMessage()
{
    console.log("Broadcasting: " + $("#txtBroadcast").val());
    //Get the text
    socketio.emit("broadcastMessage", {message : $("#txtBroadcast").val()});

    //Clear the text box
    $("#txtBroadcast").val("");
}
