const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

function init() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your project title?",
        name: "title"
      },
      {
        type: "input",
        message: "What is your project description?",
        name: "description"
      },
      {
        type: "input",
        message: "What type of license is this?",
        name: "license"
      }
    ])
    .then(function(answer) {
      fs.writeFile(
        "READMETEST.md",
        `# Project Title: ${answer.title}\n\n![Generic badge](https://img.shields.io/badge/License-${answer.license}-<COLOR>.svg)\n\n## Description: ${answer.description}\n\n## Table of Contents  
    1. Installation
    
    2. Usage
        
    3. Contributing
    
    4. Tests
    
    5. GitHub Info:\n\n `,
        function(err) {
          if (err) {
            return console.log(err);
          }
        }
      );
    })
    .then(function() {
      inquirer
        .prompt({
          type: "input",
          message: "Enter your GitHub username:",
          name: "username"
        })
        .then(function({ username }) {
          const queryUrl = `https://api.github.com/users/${username}`;
          const queryEmailUrl = `https://api.github.com/users/${username}/events/public`;
          axios.get(queryUrl).then(function(res) {
            fs.appendFile(
              "READMETEST.md",
              `\n![profile avatar](${res.data.avatar_url})\n\n`,
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
              //sniffing out the email address from their most recent public push payload
              `## Email me at: ${pushinfo.data[0].payload.commits[0].author.email}\n\n`,
              function(err) {
                if (err) {
                  throw err;
                }
              }
            );
          });
        });
    });
}

init();
