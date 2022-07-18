# Machine Learning Microsevices

This web app serves both TTS and OCR services in a web app. 

---

### Deployed Site:

https://projecto-icc.herokuapp.com/

---

### How it Works

The user is initially brought to a landing page where they have the options to either register for a new account or log in to an existing account.

#### User authentication

**Creating a New Account (Registrarse)**
When the user clicks the register button, they will be brought to a page where they must complete a form by entering a name, email address, password, and confirming their password. Passwords must be at least 6 characters in length and must match in order to sucessfully create a new account.

**Logging In (Iniciar Sesión)**
After successfully registering for an account, the user will be automatically re-directed to the log in page where they are asked to enter their email address and password. Logging in will bring the user to a simple dashboard where the user's name is displayed.

**Logging Out**
To log out of the application, a user must simply click on the log out button that appears on the dashboard.

After succcessfully login in, an API key will be stored on the client's browser, making unnecesary to login again if the users closes the browser.

#### Microservices

THis app offers TTS (Texto To Spech) and OCR (Optical Character recognition) services. First, the User uploads a image/photo that contains text and then click "Submit". Then, on the server side, a python script is invoked to process the image. 

After the processing, the script uses Keras Ocr library to extract text from the image, sending the response as a string to the client side. If the User Decides to 
use the TTS player, the ".wav" file (created as a temp file on the server by the script) is streamed to the client, and then displayed on the sound player.

---

