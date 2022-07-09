const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const users = require('./routes/api/users');

const multer = require('multer');
const cors = require('cors')
const { spawn } = require('child_process');

const User = require("./models/User");
const app = express();


require('dotenv').config();
require('./config/keys');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './uploads');
  },
  filename: (req, file, cb) => {
      cb(null,  file.originalname);
  }
});
var sound_to_play = "";
// handle upload 
var upload = multer({ storage: storage });

var restantes = 0;

// -------- upload helper ---------
// user cors for tunneling
app.use(cors());

// @route POST /upload
// @desc upload file
// @access private
app.post('/upload', upload.single('file'), (req, res) => {
  User.updateOne({ _id: req.body.id }, {$inc: {rest: -1}}).then(response=> {
		console.log("Respuesta de Base de datos: "  + response);
  })

  User.findOne({ _id: req.body.id }).then(user => {
    restantes = user.rest
  });

  if (req.file)
  {   
    const pythonProcess = spawn('python',["./IA/ocr.py", req.file.filename]);
    pythonProcess.stdout.on('data', (data) => {
      // do something ?? 
            res.json({
                imageUrl: '/uploads/${req.file.filename}',
                results: data.toString(),
                restante: restantes,
                sound_to_play: data.toString().split("\n")[0]
            });
          }) 
  }

  else
      res.status(409).json("Archivo no seleccionado");
});

// --------------------------------------------------

const port = process.env.PORT || 3001;

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const MONGODB_URI = process.env.DB_URI || 'mongodb+srv://admin:203121745@cluster0.1dpbz.mongodb.net/test';

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
