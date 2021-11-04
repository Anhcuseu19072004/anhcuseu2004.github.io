from forum_student.settings import MEDIA_ROOT, MEDIA_URL
import base64
import os
import random
import string
import re

from io import StringIO
from PIL import Image



# GLOBAL VARIABLE LuongSon
LS_LAST_UPDATE      = ('v1.0.2', '4/10/2021')
LS_CURRENT_VERSION  = ('v1.0.7','14/10/2021')

def id_generator(size=12, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

def saveImg(imgCode64, nameFirst):
    # decode from base64 to img
    if imgCode64.startswith('data:image/jpeg;base64,'):
        imgdata = base64.b64decode(imgCode64[23:])

    else:
        imgdata = base64.b64decode(imgCode64[21:])
    fileName = nameFirst
    

    # check file is exists
    if (os.path.exists(MEDIA_ROOT+"/"+fileName)):
        

        print(fileName)
        

        fileNameAble = id_generator() + "_" + fileName
        # loop until file name is not match
        while fileName == fileNameAble:
            fileNameAble = id_generator()

        # save file into database
        with open(MEDIA_ROOT + '/' + fileNameAble, 'wb') as f:
            f.write(imgdata)
            return MEDIA_URL + '/' + fileNameAble
        
    else:
        # listTemp = [
        #     '.png',
        #     '.jpg'
        # ]
        # for temp in listTemp:
        #     fileName = fileName.replace(temp, "") #rename file
        with open(MEDIA_ROOT + '/' + fileName, 'wb') as f:
            f.write(imgdata)
            return MEDIA_URL + '/' + fileName
        
    
def remove_file(name):
    if os.path.exists(MEDIA_ROOT + "/" + name):
        os.remove(MEDIA_ROOT + "/" + name)
        return 1
    else:
        return 0

