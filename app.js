const express = require('express');
const app = express();
const port = 3000;

// in middleware, the order matters...
// check the hour first!
app.use(workingHours);
// serving our static files like always
app.use(express.static('public'));

app.listen(port, () => {
  console.log('Server listening at http://localhost:3000');
});

// our custom middleware function
function workingHours(req, res, next) {

  // get the current time
  const currentTime = new Date();
  // get the hour
  const currentHour = currentTime.getHours();

  const normalBusinessHours = {
    // 24 hour time
    open: 9,
    close: 17,
  };

  // check if within normal business hours
  if (
    currentHour >= normalBusinessHours.open &&
    currentHour <= normalBusinessHours.close
  ) {

    // if so, point the request to our static files
    console.log('Open!');
    req.url = 'chauncey-gardiner-resume.pdf';
    next();

  } else {
    
    // otherwise, return the denial
    console.log('Closed 🔒 -- Normal BusinessHour 9 - 17 -- Come back another time');
    req.url = 'denied.html';
    next();

  }
  
}
