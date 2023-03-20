import numpy as np
import cv2
from sklearn.cluster import KMeans
from collections import Counter
import imutils
import pprint
from webcolors import *
import base64

def extractSkin(image):
    img =  image.copy()
    img =  cv2.cvtColor(img,cv2.COLOR_BGR2HSV)

    lower_threshold = np.array([0, 48, 80], dtype=np.uint8)
    upper_threshold = np.array([20, 255, 255], dtype=np.uint8)

    skinMask = cv2.inRange(img,lower_threshold,upper_threshold)
    skinMask = cv2.GaussianBlur(skinMask,(3,3),0)
    skin  =  cv2.bitwise_and(img,img,mask=skinMask)

    return cv2.cvtColor(skin,cv2.COLOR_HSV2BGR)

def removeBlack(estimator_labels, estimator_cluster):
    hasBlack = False
    occurance_counter = Counter(estimator_labels)
    compare = lambda x, y: Counter(x) == Counter(y)
    for x in occurance_counter.most_common(len(estimator_cluster)):
        color = [int(i) for i in estimator_cluster[x[0]].tolist() ]
        if compare(color , [0,0,0]) == True:
            del occurance_counter[x[0]]
            hasBlack = True
            estimator_cluster = np.delete(estimator_cluster,x[0],0)
            break
    return (occurance_counter,estimator_cluster,hasBlack)

def closest_colour(requested_colour):
    min_colours = {}
    for key, name in webcolors.CSS3_HEX_TO_NAMES.items():
        r_c, g_c, b_c = webcolors.hex_to_rgb(key)
        rd = (r_c - requested_colour[0]) ** 2
        gd = (g_c - requested_colour[1]) ** 2
        bd = (b_c - requested_colour[2]) ** 2
        min_colours[(rd + gd + bd)] = name
    return min_colours[min(min_colours.keys())]

def get_colour_name(requested_colour):
    try:
        closest_name = actual_name = webcolors.rgb_to_name(requested_colour)
    except ValueError:
        closest_name = closest_colour(requested_colour)
        actual_name = None
    return closest_name

def getColorInformation(estimator_labels, estimator_cluster,hasThresholding=False):
    occurance_counter = None

    colorInformation = []
    hasBlack =False

    if hasThresholding == True:
        (occurance,cluster,black) = removeBlack(estimator_labels,estimator_cluster)
        occurance_counter =  occurance
        estimator_cluster = cluster
        hasBlack = black
    else:
        occurance_counter = Counter(estimator_labels)
    totalOccurance = sum(occurance_counter.values()) 
    for x in occurance_counter.most_common(len(estimator_cluster)):
        index = (int(x[0]))
        index =  (index-1) if ((hasThresholding & hasBlack)& (int(index) !=0)) else index

        color = estimator_cluster[index].tolist()
        color_percentage= (x[1]/totalOccurance)
        colorname = get_colour_name(color)
        colorInfo = {"cluster_index":index , "color": color, "color_name": colorname}

        colorInformation.append(colorInfo)      
    return colorInformation

def extractDominantColor(image,number_of_colors=5,hasThresholding=False):
    if hasThresholding == True:
        number_of_colors +=1
    img = image.copy()

    img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
    img = img.reshape((img.shape[0]*img.shape[1]) , 3)

    estimator = KMeans(n_clusters=number_of_colors, random_state=0)

    estimator.fit(img)
    colorInformation = getColorInformation(estimator.labels_,estimator.cluster_centers_,hasThresholding)
    return colorInformation

def tone_code(color_info):
    return color_info[1]['color']

def identify_skin_tone(tone):
    
    skin_tone_ranges = {
        'Very Light': [(232, 186, 144), (255, 218, 100)],
        'Light': [(210,161,140),(232, 186, 144)],
        'Fair': [(165,126,110), (210,161,140)],
        'Medium': [(120,92,60),(165,126,110)],
        'Light Brown': [(75,50,40),(120,92,80)],
        'Brown': [(45, 34, 30),(75,57,50)]
    }
    
    for skin_tone, rgb_range in skin_tone_ranges.items():
        if all(rgb_range[0][i] <= tone[i] <= rgb_range[1][i] for i in range(3)):
            return skin_tone
    
    return 'Unknown'

def readb64(uri):
   encoded_data = uri.split(',')[1]
   nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
   img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
   return img