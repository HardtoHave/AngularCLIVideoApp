const express= require('express');
const cors = require('cors');
const app = express();
const users = require('./users');
const upload = require('./upload');
const db = require('./db');
const path = require('path');
const fs = require('fs');
const uploadDir = path.join(__dirname, '..', 'uploads/');

app.use(cors());
app.use(express.json());

const authenticate = (req, res, next) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send('Invalid username or password');
  }
};

app.post('/api/login', authenticate, (req, res) => {
  res.send(`Welcome, ${req.user.username}`);
});

app.post('/api/upload', (req, res, next) => {
  console.log('Upload route hit, processing file...');
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Error in upload middleware:', err);
      return res.status(500).send('Error processing file');
    }
    console.log('File processed by upload middleware');
    if (!req.file) {
      return res.status(400).send('No files were uploaded.');
    }
    const {filename, mimetype, size} = req.file;

    if (mimetype !=='video/mp4') {
      return res.status(400).send('File uploaded is not a video');
    }
    const uploadedFile = {
      filename,
      mimetype,
      size
    };

    db.uploads.push(uploadedFile);
    console.log(`File saved at: ${path.join(__dirname, '..', 'uploads', filename)}`);
    res.json({
      message: `File uploaded: ${filename}, ${mimetype}, ${size} bytes`,
      filename,
      mimetype,
      size
    });
  });
});
app.get('/api/uploads', (req, res) => {
  res.json(db.uploads);
});
app.delete('/api/deleteAll', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).send('Error reading directory');
    }

    files.forEach(file => {
      fs.unlink(path.join(uploadDir, file), err => {
        if (err) {
          console.error('Error deleting file:', err);
          return res.status(500).send('Error deleting file');
        }
      });
    });

    // Clear db.uploads
    db.uploads = [];

    res.json({ message: 'All files deleted successfully' });
  });
});
app.use('/uploads', express.static(path.join(__dirname, '..','uploads')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
