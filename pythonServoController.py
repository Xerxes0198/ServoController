from Adafruit_PWM_Servo_Driver import PWM
import time
import pythonLog
import os
from pythonServo import Servo

#Debug Stuff
debug = True;

#Servo file location
servo_file_path = "servoValues/";

#Array to hold all the servo instances.
servos = [];

# Initialise the PWM device using the default address
if debug == False: pwm = PWM(0x40);
if debug == True: pwm = PWM(0x40, debug=False);

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
        print fileName

        #Create a servo instance - Pass it the path
        newServo = Servo(servo_file_path + fileName);

        #Ask that instance to update itself and apply the values

        #Add the insance of the servo the Servos array

if debug == True: getServos()
