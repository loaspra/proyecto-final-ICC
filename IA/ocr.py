import string
import sys
import keras_ocr
from gtts import gTTS

pipeline = keras_ocr.pipeline.Pipeline(scale=1)
filename = sys.argv[1]

images = keras_ocr.tools.read("./uploads/" + filename)

prediction_groups = pipeline.recognize([images])
this = prediction_groups[0]

texto = ""

# Todo: ordenar las palabras dependiendo de su ubicacion. 
for e in this:
     texto = texto + " " + e[0]

language = 'es'
tldd = 'com.mx'
nombre = filename.split(".")[0]
tts = gTTS(text=texto, lang=language,tld=tldd, slow=False)
tts.save("./sounds/" + nombre + ".wav")

print(nombre + ".wav")
print(texto)
sys.stdout.flush()