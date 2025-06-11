#!/usr/bin/env node

import inquirer from 'inquirer';
import { promisify } from 'util';
import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import { program } from 'commander';
import downloadGitRepo from 'download-git-repo';

// Promisify the downloadGitRepo function
const download = promisify(downloadGitRepo);

// Define the template repository URL
const TEMPLATE_REPO = 'direct:https://github.com/bearangel/nestjs-template.git#main';

// Define the questions to ask the user
const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Project name:',
    default: 'my-project',
    validate: (input: string) => {
      if (/^[a-zA-Z0-9-_]+$/.test(input)) return true;
      return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  },
  {
    type: 'input',
    name: 'version',
    message: 'Version:',
    default: '0.1.0'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description:',
    default: 'A project created with pt-nestjs-cli'
  },
  {
    type: 'input',
    name: 'author',
    message: 'Author:'
  },
  {
    type: 'list',
    name: 'packageManager',
    message: 'Package manager:',
    choices: ['npm', 'pnpm', 'yarn'],
    default: 'npm'
  }
];

// Main function to run the CLI
async function run() {
  console.log(chalk.blue('Welcome to the Project Template CLI!'));
  console.log(chalk.green('Please answer the following questions to set up your project:'));

  try {
    // Ask the user for project details
    const answers = await inquirer.prompt(questions);

    const { projectName, version, description, author, packageManager } = answers;

    // Create project directory
    const targetDir = path.join(process.cwd(), projectName);

    // Check if directory already exists
    if (fs.existsSync(targetDir)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `Directory ${projectName} already exists. Overwrite?`,
          default: false
        }
      ]);

      if (!overwrite) {
        console.log(chalk.yellow('Operation cancelled.'));
        return;
      }

      // Remove existing directory
      fs.removeSync(targetDir);
    }

    // Create the project directory
    fs.ensureDirSync(targetDir);

    // Download the template
    console.log(chalk.blue('Downloading template...'));
    await download(TEMPLATE_REPO, targetDir, { clone: true });

    // Update package.json
    const packageJsonPath = path.join(targetDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);

      // Update package.json with user input
      packageJson.name = projectName;
      packageJson.version = version;
      packageJson.description = description;
      packageJson.author = author;

      // Write the updated package.json
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

      console.log(chalk.green('Project created successfully!'));
      console.log(chalk.blue('To get started:'));
      console.log(chalk.white(`  cd ${projectName}`));

      // Display the appropriate install command based on the selected package manager
      switch (packageManager) {
        case 'npm':
          console.log(chalk.white('  npm install'));
          console.log(chalk.white('  npm run start:dev'));
          break;
        case 'pnpm':
          console.log(chalk.white('  pnpm install'));
          console.log(chalk.white('  pnpm run start:dev'));
          break;
        case 'yarn':
          console.log(chalk.white('  yarn'));
          console.log(chalk.white('  yarn start:dev'));
          break;
      }
    } else {
      console.log(chalk.red('Error: package.json not found in the template.'));
    }
  } catch (error) {
    console.error(chalk.red('Error creating project:'), error);
  }
}

// Set up the command line interface
program
  .name('pt-nestjs-cli')
  .description('A CLI to create projects from templates')
  .version('1.0.0')
  .action(run);

// Parse command line arguments
program.parse(process.argv);
