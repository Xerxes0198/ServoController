#Import libraries
import os
import time
import datetime
import pythonLog
import PiValues
import json
#import pythonServoController

#Debug Stuff
debug = True
DebugSleepTime = 1
ReleaseSleepTime = float(0.01) #For some strange reason no sleep delay causes read errors. A small delay seems to help for now

#Global
program_error = False
servos = []

#Start Servo Service
print "Hello, World!..."
if debug == False: print "Loop Running, silent. (Loop started at: " + str(datetime.datetime.now()) + ")"
pythonLog.Log("Loop Running. (Loop started at: " + str(datetime.datetime.now()) + ")")
pythonLog.Log("Current CPU Temp: " + str(PiValues.getCPUTemp()))


#Read in initial/current values
try:
	servos = [int(line.rstrip('\n')) for line in open('servoValues')]
except ValueError:
	pythonLog.Log("Error reading in initial servo values.. Perhaps it's not parsing properly.");
	program_error = True

#Test servo call
#pythonServoController.testServos()

#Write Functions Here
def outputValues():
	for i in range(0, len(servos)):
		print ("Servo {0} is set to value: {1}").format(str(i),str(servos[i]))
	return

def updateValues():
	try:
		servos = [int(line.rstrip('\n')) for line in open('servoValues')]
	except ValueError:
		pythonLog.Log("Error reading in initial servo values.. Perhaps it's not parsing properly.");
		program_error = True
	return

def updatePiValues():
	#Write this in a JSON format for the webserver
	try:
		data = json.loads('{"Temp" : ' + str(PiValues.getCPUTemp()) + ', "ServoValue" : ' + str("22") + '}')
		pythonLog.writePiValues(data)
		return
	except ValueError:
		pythonLog.Log("Error parsing JSON data, possible write not finised.")


#Begin Service Loop
while True:
	#Clear the screen
	if debug == True:os.system('cls')

	#Read in new values
	updateValues()

	#Get Pi values and write them to a file for the node server to read
	updatePiValues();

	#Output Values if in Debug
	if debug == True:outputValues()

	if debug == True:
		print "Debug Mode! Delaying loop for " + str(DebugSleepTime) + " second(s)"
		time.sleep(DebugSleepTime)
	else:
		time.sleep(ReleaseSleepTime)
