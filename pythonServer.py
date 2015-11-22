#Import libraries
import os
import time
import datetime
import pythonLog
import PiValues
import json
import pythonServoController

#Debug Stuff
debug = False
DebugSleepTime = 5
ReleaseSleepTime = float(0.01) #For some strange reason no sleep delay causes read errors. A small delay seems to help for now

#Global
global Value

#Start Servo Service
print "Hello, World!..."
if debug == False: print "Loop Running, silent. (Loop started at: " + str(datetime.datetime.now()) + ")"
pythonLog.Log("Loop Running. (Loop started at: " + str(datetime.datetime.now()) + ")")
pythonLog.Log("Current CPU Temp: " + str(PiValues.getCPUTemp()))


#Read in initial/current values
TestServoValue = open('servovalue', 'r')
Value = TestServoValue.read()

#Test servo call
pythonServoController.testServos()

#Write Functions Here
def outputValues():
	print "------------------"
	print "Servo 1: " + Value
	print "------------------"

	return

def updateValues():
	global Value
	if debug == True: print "Current Servo Value: " + str(Value)

	TestServoValue = open('servovalue', 'r')
	newValue = TestServoValue.read()

	if newValue != Value:
		if debug == True: print "New servo value set."
		if debug == True: print "Old Value: " + str(Value) + " - New Value: " + str(newValue)
		if debug == True: print "Reading in Updated Servo Values: " + newValue

		pythonLog.Log("New servo value set.")
		pythonLog.Log("Reading in Updated Servo Values: " + newValue)
		pythonLog.Log("Old Value: " + str(Value) + " - New Value: " + str(newValue))


		Value = newValue

		#Send the new value to the servo controller
		pythonServoController.setSteeringServo(Value)

		TestServoValue.close()
	return

def updatePiValues():
	#Write this in a JSON format for the webserver
	try:
		data = json.loads('{"Temp" : ' + str(PiValues.getCPUTemp()) + ', "ServoValue" : ' + str(Value) + '}')
		pythonLog.writePiValues(data)
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
