import sys
# import keras_ocr
# from gtts import gTTS

# pipeline = keras_ocr.pipeline.Pipeline(scale=0.7)
filename = sys.argv[1]

# images = keras_ocr.tools.read("./uploads/" + filename)

# prediction_groups = pipeline.recognize([images])
# this = prediction_groups[0]

# texto = ""

# # Todo: ordenar las palabras dependiendo de su ubicacion. 
# for e in this:
#      texto = texto + " " + e[0]

# language = 'es'
# tldd = 'com.mx'
# nombre = filename.split(".")[0]
# tts = gTTS(text=texto, lang=language,tld=tldd, slow=False)
# tts.save("./sounds/" + nombre + ".wav")

# print(nombre + ".wav")
# print(texto)
# sys.stdout.flush()

import io
import json
import cv2
import numpy as np
import requests
from gtts import gTTS

img = cv2.imread("./uploads/" + filename)

url_api = "https://api.ocr.space/parse/image"
_, compressedimage = cv2.imencode(".jpg", img, [1, 90])
file_bytes = io.BytesIO(compressedimage)

result = requests.post(url_api,
              files = {"screenshot.jpg": file_bytes},
              data = {"apikey": "K85547285888957",
                      "language": "eng"})

result = result.content.decode()
result = json.loads(result)

parsed_results = result.get("ParsedResults")[0]
texto = parsed_results.get("ParsedText")
nombre = filename.split(".")[0]
print(nombre + ".wav")

language = 'es'
tldd = 'com.mx'
nombre = filename.split(".")[0]
tts = gTTS(text=texto, lang=language,tld=tldd, slow=False)
tts.save("./sounds/" + nombre + ".wav")

print(texto)
sys.stdout.flush()