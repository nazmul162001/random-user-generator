const fs = require("fs");

// Get Random User...
const getRandomUser = (req, res) => {
  try {
    const jsonData = fs.readFileSync("config.json");
    const data = JSON.parse(jsonData);
    const randomValue = Math.floor(Math.random() * data.length);
    const single = data[randomValue];
    res.json(single);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Get All Random User
const getAllUser = (req, res) => {
  try {
    const { limit } = req.query;
    const jsonData = fs.readFileSync("config.json");
    const data = JSON.parse(jsonData);
    if (limit) {
      res.status(200).json(data.slice(0, limit));
      return;
    }
    res.json(data);
  } catch (error) {
    res.json({ message: error.message });
  }
};


// Export All Controllers  Function
module.exports = {
  getRandomUser,
  getAllUser,
  saveRandomUser,
  updateRandomUser,
  updateMultipleUser,
  deleteUser,
};