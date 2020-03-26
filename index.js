const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer.prompt([
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
]).then(function(answer) {
    fs.writeFile("READMETEST.md", 
    `# Project Title: ${answer.title}\n\n## Description: ${answer.description}\n\n## Table of Contents  
    1. Installation
    
    2. Usage
    
    3. License - ${answer.license}
    
    4. Contributing
    
    5. Tests
    
    6. GitHub Info: `, function(err) {
        if (err) {
            return console.log(err);
        }
    })
})



// inquirer
//   .prompt({
//     type: "input",
//     message: "What is your project title?",
//     name: "title"
//   })
//   .then(function({ title }) {
//     fs.appendFile("READMEtest.md", `#Project Title: ${title}\n`, function(err) {
//       if (err) {
//         throw err;
//       }
//     });
//   })
//   .then(function() {
//     inquirer
//       .prompt({
//         message: "Enter your GitHub username:",
//         name: "username"
//       })
//       .then(function({ username }) {
//         const queryUrl = `https://api.github.com/users/${username}`;
//         const queryEmailUrl = `https://api.github.com/users/${username}/events/public`;
//         axios.get(queryUrl).then(function(res) {
//           fs.appendFile(
//             "READMEtest.md",
//             `![profile avatar](${res.data.avatar_url})\n`,
//             function(err) {
//               if (err) {
//                 throw err;
//               }
//             }
//           );
//         });
//         axios.get(queryEmailUrl).then(function(pushinfo) {
//           fs.appendFile(
//             "READMEtest.md",
//             //most people do not have their email set to a public profile, this is a sneakier way of getting it
//             `Email me at: ${pushinfo.data[0].payload.commits[0].author.email}\n`,
//             function(err) {
//               if (err) {
//                 throw err;
//               }
//             }
//           );
//         });
//       });
//   });

// const questions = [];

// function writeToFile(fileName, data) {}

// function init() {}

// init();
