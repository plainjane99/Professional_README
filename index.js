// =============== all global and local utility modules go here ===============
// accesses the inquirer module downloaded from npm
const inquirer = require('inquirer');
// accesses the fs module 
const fs = require('fs');
// adds the local modules
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
        message: 'Please provide the project title. (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter a title.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please provide a description. (Required)',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Please provide a description.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please provide installation instructions.',
        default: 'None required.'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please provide usage information. (Required)',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please provide usage information.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Please provide contribution guidelines.',
        default: 'Please contact me.'
    },
    {
        type: 'input',
        name: 'test',
        message: 'Please provide test instructions.',
        default: 'No tests exist at this time.'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please choose the license for your application. (Required)',
        choices: ['Apache_2.0', 'BSD_2.0', 'MIT', 'GNU_GPL_2.0', 'GNU_GPL_3.0']
    },
    {
        type: 'input',
        name: 'githubUsername',
        message: 'Please provide your GitHub Username. (Required)',
        validate: userNameInput => {
            if (userNameInput) {
                return true;
            } else {
                console.log('Please provide your GitHub Username.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please provide your email. (Required)',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Please provide your email.');
                return false;
            }
        }
    },
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
            return writeToFile("README_new.md", markdownData);
        })
    ;
}

// function call to initialize program
init();