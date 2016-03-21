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
  socketio = io.connect("192.168.178.47:13378");

  socketio.on("return_data", function(data)
  {
    console.log("Server said: " + data["ServoValue"]);
    console.log("Server said: " + data["Temp"]);
    console.log("Server said: " + data);
  });
});

function testSocket()
{
  toastr.info("Sending a test request to the socket service!");

  //Get some initial values
  socketio.emit("test_socket", function(data)
  {

  });

  socketio.on("test_return", function()
  {
    //ADAFS
    toastr.warning("The server hit me back! The socket is active");
  });
}
