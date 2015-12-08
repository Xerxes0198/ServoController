from Adafruit_PWM_Servo_Driver import PWM
import time
import pythonLog
import os
from pythonServo import Servo

#Debug Stuff
debug = False;

#Servo file location
servo_file_path = "servoValues/";

#Array to hold all the servo instances.
servos = [];

# Initialise the PWM device using the default address
if debug == False: pwm = PWM(0x40);
if debug == True: pwm = PWM(0x40, debug=True);

def setServoPulse(channel, pulse):
  pulseLength = 1000000                   # 1,000,000 us per second
  pulseLength /= 60                       # 60 Hz
  print "%d us per period" % pulseLength
  pulseLength /= 4096                     # 12 bits of resolution
  print "%d us per bit" % pulseLength
  pulse *= 1000
  pulse /= pulseLength
  pwm.setPWM(channel, 0, pulse)
  return

pwm.setPWMFreq(60)                        # Set frequency to 60 Hz

#############################################################################
#Loop through the folder and find all the servos and then create an instance of them
def getServos():
    for fileName in os.listdir(servo_file_path):
        #Create a servo instance - Pass it the path
        newServo = Servo(servo_file_path + fileName);

        #Add the insance of the servo the Servos array
        servos.append(newServo);
    print "Found {0} servo{1}".format(str(len(servos)), 's' if len(servos) > 1 else '');

#Apply updated servos values
def updateServos():
    for servo in servos:
        servo.updateFromFile();

#Output all servo details
def outputServoValues():
    for servo in servos:
        servo.outputValues();
