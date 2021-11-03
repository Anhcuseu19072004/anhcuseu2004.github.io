from forum_student.settings import MEDIA_ROOT, MEDIA_URL
import base64
import os
import random
import string
import re



# GLOBAL VARIABLE LuongSon
LS_LAST_UPDATE      = ('v1.0.2', '4/10/2021')
LS_CURRENT_VERSION  = ('v1.0.7','14/10/2021')

def id_generator(size=12, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

def saveImg(imgCode64, nameFirst):
    # decode from base64 to img
    imgdata = base64.b64decode(imgCode64[21:])
    fileName = nameFirst
    # check file is exists
    if (os.path.exists(MEDIA_ROOT+"/"+fileName)):
        listTemp = [
            '.png',
            '.jpg',
            '.JPEG ',
            '.PSD',
            '.svg'
        ]


        for temp in listTemp:
            fileName = fileName.replace(temp, "") #rename file

        fileNameAble = fileName + "_" +id_generator()
        # loop until file name is not match
        while fileName == fileNameAble:
            fileNameAble = id_generator()

        # save file into database
        with open(MEDIA_ROOT + '/' + fileNameAble +".png", 'wb') as f:
            f.write(imgdata)
            return MEDIA_URL + '/' + fileNameAble +".png"
    else:
        listTemp = [
            '.png',
            '.jpg'
        ]
        for temp in listTemp:
            fileName = fileName.replace(temp, "") #rename file
        with open(MEDIA_ROOT + '/' + fileName +".png", 'wb') as f:
            f.write(imgdata)
            return MEDIA_URL + '/' + fileName +".png"
    
def remove_file(name):
    if os.path.exists(MEDIA_ROOT + "/" + name):
        os.remove(MEDIA_ROOT + "/" + name)
        return 1
    else:
        return 0

