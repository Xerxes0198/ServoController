var socketio;

var mouseDownCurrently = false;
var sliderControl, oldSliderValue;



function sendMouseUpdates()
{
  if(mouseDownCurrently == true)
  {
    //Only hassle the socket connection if there is a change in value!
    if($("#arc-slider").data("roundSlider").getValue() != oldSliderValue)
    {
      console.log("Sending steering update: " + $("#arc-slider").data("roundSlider").getValue());

      //Send Value
      socketio.emit("update_steering_servo_value", $("#arc-slider").data("roundSlider").getValue());

      //Update old slider value
      oldSliderValue = $("#arc-slider").data("roundSlider").getValue();
    }
    setTimeout(sendMouseUpdates, 10, 1);
  }
}

function mouseDownToggle()
{
  mouseDownCurrently = !mouseDownCurrently;
  sendMouseUpdates();
}
    
$(document).ready(function()
{
  $("#btnYeahYeah").click(function(e){
    $("#jmbHello").hide();
  })

  //Setup slider for steering
  $("#arc-slider").roundSlider({
      radius: 80,
      circleShape: "half-top",
      sliderType: "min-range",
      showTooltip: true,
      value: 50
  });
  
  $("#arc-slider").mousedown(function()
  {
    console.log("Mouse Down on slider!");
    mouseDownToggle();
  });
  
  $("#arc-slider").mouseup(function()
  {
    console.log("Mouse released from slider!");
    mouseDownToggle();
  });

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
