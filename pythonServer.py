#Import libraries
import os
import time
import datetime
import pythonLog
import piValues
import json
import pythonServoController

#Debug Stuff
debug = True
DebugSleepTime = 1
ReleaseSleepTime = float(0.01) #For some strange reason no sleep delay causes read errors. A small delay seems to help for now

#Global
global servos

#Start Servo Service
print "Hello, World!..."
if debug == False: print "Loop Running, silent. (Loop started at: " + str(datetime.datetime.now()) + ")"
pythonLog.Log("Loop Running. (Loop started at: " + str(datetime.datetime.now()) + ")")
pythonLog.Log("Current CPU Temp: " + str(piValues.getCPUTemp()))

#Read in all the servos from the folder
pythonServoController.getServos()

#Test servo call
#pythonServoController.testServos()

#Write Functions Here
def outputValues():
	pythonServoController.outputServoValues();
	return

def updateValues():
	pythonServoController.updateServos();
	return

def updatePiValues():
	#Write this in a JSON format for the webserver
	try:
		data = json.loads('{"Temp" : ' + str(piValues.getCPUTemp()) + ', "ServoValue" : ' + str("22") + '}')
		#pythonLog.writePiValues(data)
		return
	except ValueError:
		pythonLog.Log("Error parsing JSON data, possible write not finised.")


#Begin Service Loop
while True:
	#Clear the screen
	if debug == True:os.system('clear')

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
