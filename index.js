const express = require('express');
const app = express();
const user = require('./routes/user');
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use('/user', user);
app.get('/', (req, res) => {
  res.send('Welcome to my random generator application!');
});

// Server Connection
app.listen(PORT, () => {
  console.log(`Server is open in ${PORT} Port`);
});
