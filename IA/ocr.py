import string
import sys
import keras_ocr
from gtts import gTTS

pipeline = keras_ocr.pipeline.Pipeline()
filename = sys.argv[1]

print("Resultados del archivo:" + filename)
images = keras_ocr.tools.read("./uploads/" + filename)

prediction_groups = pipeline.recognize([images])
this = prediction_groups[0]

texto = ""

for e in this:
     print(e[0])
     texto = texto + e[0]

language = 'es'
tldd = 'com.mx'

tts = gTTS(text=texto, lang=language,tld=tldd, slow=False)
tts.save("./sounds/tts.wav")

# sys.stdout.flush()