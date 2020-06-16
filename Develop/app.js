const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const generateHtml = () => {
  fs.writeFileSync(outputPath, render(teamMembersArray), "utf-8");
};

const render = require("./lib/htmlRenderer");

const teamMembersArray = [];

getEmployee();

getEmployee = () => {
  inquirer
    .prompt([
      {
        name: "employee",
        type: "list",
        message: "what Employee do you want to build?",
        choices: ["Manager", "Intern", "Engineer", "Generate HTML"],
      },
    ])
    .then((e) => {
      if (e.employee === "Manager") {
        createManager();
      } else if (e.employee === "Intern") {
        createIntern();
      } else if (e.employee === "Engineer") {
        createEngineer();
      } else {
        generateHtml();
      }
    });
};

createManager = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter manager's name?",
      },
      {
        type: "number",
        name: "id",
        message: "Enter manager's id?",
      },
      {
        type: "input",
        name: "email",
        message: "Enter manager's email?",
      },
      {
        type: "number",
        name: "officeNumber",
        message: "Enter manager's officeNumber?",
      },
    ])
    .then((m) => {
      const { name, id, email, officeNumber } = m;
      teamMembersArray.push(new Manager(name, id, email, officeNumber));
      getEmployee();
    });
};

createIntern = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter intern's name?",
      },
      {
        type: "number",
        name: "id",
        message: "Enter intern's id?",
      },
      {
        type: "input",
        name: "email",
        message: "Enter intern's email?",
      },
      {
        type: "input",
        name: "school",
        message: "Enter intern's school?",
      },
    ])
    .then((m) => {
      const { name, id, email, school } = m;
      teamMembersArray.push(new Intern(name, id, email, school));
      getEmployee();
    });
};

createEngineer = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter engineer's name?",
      },
      {
        type: "number",
        name: "id",
        message: "Enter engineer's id?",
      },
      {
        type: "input",
        name: "email",
        message: "Enter engineer's email?",
      },
      {
        type: "input",
        name: "github",
        message: "Enter engineer's github username?",
      },
    ])
    .then((m) => {
      const { name, id, email, github } = m;
      teamMembersArray.push(new Engineer(name, id, email, github));
      getEmployee();
    });
};

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
