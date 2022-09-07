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


// Add New Random User
const saveRandomUser = (req, res) => {
  try {
    const { gender, name, contact, address, photoUrl } = req.body;
    if (!gender || !name || !contact || !address || !photoUrl) {
      res.status(404).json({
        message:
          "Properties missing! please Must  include { gender , name ,contact ,photoUrl }",
      });
      return;
    }
    const jsonData = fs.readFileSync("config.json");
    const data = JSON.parse(jsonData);
    const newUser = {
      id: data.length + 1,
      gender,
      name,
      contact,
      address,
      photoUrl,
    };
    fs.readFile("config.json", function (err, data) {
      const json = JSON.parse(data);
      json.push(newUser);
      fs.writeFile("config.json", JSON.stringify(json), function (err) {
        if (err) throw err;
      });
    });
    res.status(200).json({ message: " Successfully Saved Random User " });
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