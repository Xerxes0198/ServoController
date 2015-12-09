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

        #open the file and do the magic
        with open(self.SERVO_FILE_PATH, 'r') as file:
            values = file.read().split(':');

        self.servo_pin       = values[0];
        self.servo_min       = values[1];
        self.servo_max       = values[2];
        self.servo_current   = values[3];

    #Get the current values
    def getCurrentValue():
        return int(self.servo_current);

    #Get the current pin
    def getPin():
        return int(self.servo_pin);


    #Output all values
    def outputValues(self):
        print "-------------------------";
        print "Servo: " + self.SERVO_FILE_PATH;
        print "Pin: : " + str(self.servo_pin);
        print "Min: : " + str(self.servo_min);
        print "Max: : " + str(self.servo_max);
        print "Current: : " + str(int(self.servo_current));
        print "-------------------------";



    #Constructor method!
    def __init__(self, inFilePath):
        self.SERVO_FILE_PATH = inFilePath;

        #update for the first time and set values
        self.updateFromFile();
