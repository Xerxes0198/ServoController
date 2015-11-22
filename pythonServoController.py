from Adafruit_PWM_Servo_Driver import PWM
import time
import pythonLog

#Debug Stuff
debug = False

# Initialise the PWM device using the default address
if debug == False: pwm = PWM(0x40)
if debug == True: pwm = PWM(0x40, debug=True)

servoMin = 400  # Min pulse length out of 4096
servoMax = 550  # Max pulse length out of 4096

#Values for steering servo
steeringServoMin = 310;
steeringServoMax = 650;

def setSteeringServo(newVal):
    try:
        pythonLog.Log("Attempting to adjust servo to: " + str(newVal))
        pwm.setPWM(1, 0, steeringServoMin + int(newVal))
    except ValueError:
        pythonLog.Log("#@$^@$##%$")
    return


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

def testServos():
	pwm.setPWM(0, 0, servoMin + 10)
	time.sleep(.8)
	pwm.setPWM(0, 0, servoMax)
	time.sleep(.8)

	pwm.setPWM(1, 0, steeringServoMax)
	time.sleep(.8)
	pwm.setPWM(1, 0, steeringServoMin)
	time.sleep(.8)
