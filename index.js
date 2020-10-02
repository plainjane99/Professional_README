// =============== all global and local utility modules go here ===============
// accesses the inquirer module downloaded from npm
const inquirer = require('inquirer');
// accesses the fs module 
const fs = require('fs');
// adds the generateMarkdown module
const generateMarkdown = require('./utils/generateMarkdown.js');


// function that queries the user for input
const promptUser = () => {
    return inquirer.prompt(questions);
};

// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the project title? (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter a title.');
                return false;
            }
        }
    }
];

// function to write README file
function writeToFile(fileName, data) {

    return new Promise((resolve, reject) => {
        fs.writeFile('./' + fileName, data, error => {
            if(error) {
                reject(error);
                return;
            }
    
            resolve({
                ok: true,
                message: 'File Created!'
            });
        });
    })
};

// function to initialize program
function init() {
    promptUser()
        .then(userInputData => {
            return generateMarkdown(userInputData);
        })
        .then(markdownData => {
            return writeToFile("README.md", markdownData);
        })
    ;
}

// function call to initialize program
init();