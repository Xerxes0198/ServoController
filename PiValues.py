import os
import subprocess


def getIPAddress():
	arg = "ip route list"
	p = subprocess.Popen(arg, shell = True, stdout = subprocess.PIPE)
	data = p.communicate()
	split_data = data[0].split()
	ipaddr = split_data[split_data.index('src') + 1]
	return ipaddr


def getCPUTemp():
	try:
		s = subprocess.check_output(["/opt/vc/bin/vcgencmd", "measure_temp"])
		return float(s.split('=')[1][:-3])
	except:
		return 0
