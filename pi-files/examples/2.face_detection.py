#!/usr/bin/python3
import sys
import os
sys.path.append(r'/opt/ezblock')
from vilib import Vilib
from ezblock import WiFi
from ezblock import print

Vilib.camera_start(True)
Vilib.human_detect_switch(True)
WiFi().write('CN', 'CactusMetropolis', 'Fuckjews1')


def forever():
    print("%s"%(''.join([str(x) for x in ['There are ', Vilib.human_detect_object('number'), ' people']])))

if __name__ == "__main__":
    while True:
        forever()  