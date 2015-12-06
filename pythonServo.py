import os;

class Servo:
    """A Servo class that holds a current state and address of a servo"""
    SERVO_FILE_PATH = "";

    servo_pin     = 0;
    servo_min     = 0;
    servo_max     = 0;
    servo_current = 0;

    #Function to update the values from the File
    def updateFromFile(self):
        print "Updating from file"

        #open the file and do the magic
        with open(SERVO_FILE_PATH, 'r') as file:
            values = file.read().split(':');

        servo_pin       = values[0];
        servo_min       = values[1];
        servo_max       = values[2];
        servo_current   = values[3];



    #Constructor method!
    def __init__(self, inFilePath):
        print "A new servo has spawned: " + inFilePath;
        global SERVO_FILE_PATH;
        SERVO_FILE_PATH = inFilePath;

        #update for the first time and set values
        self.updateFromFile();
