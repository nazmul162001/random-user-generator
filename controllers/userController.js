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


// updated Random User
const updateRandomUser = (req, res) => {
  try {
    const { id } = req.params;
    const { gender, name, contact, address, photoUrl } = req.body;
    const content = JSON.parse(fs.readFileSync("config.json", "utf8"));
    const Result = content.find((data) => data.id == id);
    if (!Result) {
      res.status(404).json({
        message: `This User  ( ${id}▫ ) Id Not Found! Make Sure Send Valid User id`,
      });
      return;
    }
    let updatedArray = [];
    content.map((c) => {
      if (c.id == Number(id)) {
        c.gender = gender ? gender : c.gender;
        c.name = name ? name : c.name;
        c.contact = contact ? contact : c.contact;
        c.address = address ? address : c.address;
        c.photoUrl = photoUrl ? photoUrl : c.photoUrl;
      }
      updatedArray.push(c);
      fs.writeFileSync("config.json", JSON.stringify(updatedArray));
    });
    res.status(200).json({
      message: "Updated Successfully Completed Random Single User ",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};


// Multiple Random usersUpdated
const updateMultipleUser = (req, res) => {
  try {
    const arrayMultipleUsers = req.body;
    arrayMultipleUsers.map((mu) => {
      const content = JSON.parse(fs.readFileSync("config.json", "utf8"));
      let updatedArray = [];
      content.map((c) => {
        if (c.id == mu.id) {
          c.gender = mu.gender ? mu.gender : c.gender;
          c.name = mu.name ? mu.name : c.name;
          c.contact = mu.contact ? mu.contact : c.contact;
          c.address = mu.address ? mu.address : c.address;
          c.photoUrl = mu.photoUrl ? mu.photoUrl : c.photoUrl;
        }
        updatedArray.push(c);
        fs.writeFileSync("config.json", JSON.stringify(updatedArray));
      });
    });
    res
      .status(200)
      .json({ message: " Update Multiple User Successfully Completed " });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Delete single User
const deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    const content = JSON.parse(fs.readFileSync("config.json", "utf8"));
    const Result = content.find((data) => data.id == id);
    if (!Result) {
      res.status(404).json({
        message: `This User  ( ${id}▫ ) Id Not Found! Make Sure Send Valid User id`,
      });
      return;
    }
    const filteredUser = content.filter((u) => u.id !== Number(id));
    fs.writeFileSync("config.json", JSON.stringify(filteredUser));
    res.status(200).json({ message: " Delete user Successfully! " });
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