// function to generate markdown for README
function generateMarkdown(data) {
  return `
# ${data.title}

# Description
${data.description}

# Installation
${data.installation}

# Usage
${data.usage}

# Contributing
${data.contribution}

# Tests
${data.test}

  `;
}

module.exports = generateMarkdown;
