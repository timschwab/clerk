// Libraries
const path = require('path');
const express = require('express');
const app = express();

// Constants
const dir = __dirname;
const port = process.env.PORT || 3000;

// Static files
app.use(express.static(path.join(dir, 'src/dist')));

// Serve the Vue Single Page App
app.use((req, res, next) => res.sendFile(path.join(dir, 'src', 'index.html')));

app.listen(port, () => console.log('Site running on ' + port));
