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
    const queryEmailUrl = `https://api.github.com/users/${username}/events/public`;
    axios.get(queryUrl).then(function(res) {
      fs.appendFile(
        "READMEtest.md",
        `![profile avatar](${res.data.avatar_url})`,
        function(err) {
          if (err) {
            throw err;
          }
        }
      );
    });
    axios.get(queryEmailUrl).then(function(pushinfo) {
      fs.appendFile(
        "READMEtest.md",
        //most people do not have their email set to a public profile, this is a sneakier way of getting it
        `<br/> Email me at: ${pushinfo.data[0].payload.commits[0].author.email}`,
        function(err) {
          if (err) {
            throw err;
          }
        }
      );
    });
  });
// const questions = [];

// function writeToFile(fileName, data) {}

// function init() {}

// init();
