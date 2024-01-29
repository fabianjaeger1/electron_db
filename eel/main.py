import eel 

import os
import sys
from tkinter import filedialog as fd
import tkinter as tk
from src import *

eel.init('web')

def read_query():
    print("test")


def resource_path(relative_path):   
    """ !IMPORTANT FOR BUNDLING WITH ELECTRON!
    Get absolute path to resource, works for dev and for PyInstaller """
    if hasattr(sys, '_MEIPASS'):
        return os.path.join(sys._MEIPASS, relative_path)
    return os.path.join(os.path.abspath("."), relative_path)

@eel.expose
def return_string(string):
    print(string)

@eel.expose
def button_click():
    print('Button clicked!')

@eel.expose
def open_file_dialog():
    dir = fd.askdirectory(title="Select a directory")
    print(dir)



return_string("Hello World")

# eel.start('frontend/index.html')
# eel.browsers.set_path('electron', 'node_modules/electron/dist/electron')
eel.start('frontend/index.html', mode='electron')
