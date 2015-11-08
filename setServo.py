#Import libraries
import os
import time
import datetime
import Log

#Debug Stuff
debug = False
DebugSleepTime = 5
ReleaseSleepTime = float(0.01) #For some strange reason no sleep delay causes read errors. A small delay seems to help for now

#Global
global Value

#Start Servo Service
print "Hello, World!..."
if debug == False: print "Loop Running, silent. (Loop started at: " + str(datetime.datetime.now()) + ")"

Log.Log("Loop Running. (Loop started at: " + str(datetime.datetime.now()) + ")")


#Read in initial/current values
TestServoValue = open('servovalue', 'r')
Value = TestServoValue.read()

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
		
		Log.Log("New servo value set.")
		Log.Log("Reading in Updated Servo Values: " + newValue)
		Log.Log("Old Value: " + str(Value) + " - New Value: " + str(newValue))

		Value = newValue

	TestServoValue.close()

	return


#Begin Service Loop
while True:
	#Clear the screen
	if debug == True:os.system('clear')

	#Read in new values
	updateValues()

	#Output Values if in Debug
	if debug == True:outputValues()

	if debug == True:
		print "Debug Mode! Delaying loop for " + str(DebugSleepTime) + " second(s)"
		time.sleep(DebugSleepTime)
	else:
		time.sleep(ReleaseSleepTime)
