import string
import sys
import keras_ocr
from gtts import gTTS

pipeline = keras_ocr.pipeline.Pipeline(scale=1)
filename = sys.argv[1]

print("Resultados del archivo: " + filename)
images = keras_ocr.tools.read("./uploads/" + filename)

prediction_groups = pipeline.recognize([images])
this = prediction_groups[0]

texto = ""

# Todo: ordenar las palabras dependiendo de su ubicacion. 
for e in this:
     texto = texto + " " + e[0]

print(texto)
sys.stdout.flush()

language = 'es'
tldd = 'com.mx'

tts = gTTS(text=texto, lang=language,tld=tldd, slow=False)
tts.save("./sounds/" + filename.split(".")[0] + ".wav")
