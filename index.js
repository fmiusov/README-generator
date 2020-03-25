const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(res) {
      const profilePicUrl = res.data.avatar_url;
      console.log(profilePicUrl);
      
      

      fs.appendFile("READMEtest.md", `![profile avatar](${profilePicUrl})`, function(err) {
        if (err) {
          throw err;
        }

        console.log(`Saved ${profilePicUrl} as an image url`);
      });
    });
  });
// const questions = [];

// function writeToFile(fileName, data) {}

// function init() {}

// init();
