#Greg's Python Logger file

#Debug Mode
debug = False;

#Import Libraries
import datetime
import json

#Create / Append Log File
global File
File = open('log.txt', 'a')

def Log(givenMessage):
	File = open('log.txt', 'a')
	File.write(str(datetime.datetime.now()) + " -- ")
	File.write(givenMessage + '\n')
	File.close()
	return

def writePiValues(givenData):
	File = open('piValues.txt', 'w')
	File.write(json.dumps(givenData))
	File.close
	return

#If this is a new instance called, write two blank lines for readability
Log('End Of Log!\n\n')

#Write a test if in debug mode
if debug == True : Log('Debug Test Write!')
