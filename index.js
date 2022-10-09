import { bidAuction, postAuction } from './operations/index.js';
import { createConnection, databaseConnection } from './database/index.js';

import { PROMPTS } from './prompts/index.js';
import inquirer from 'inquirer';

export const runApp = () => {
  inquirer.prompt(PROMPTS.OPERATION[0]).then(answer => {
    if (answer.PoB.toUpperCase() === "POST") {
      postAuction();
    } else {
      bidAuction();
    };
  });
};

const startApp = async () => {
  await createConnection();
  await databaseConnection();
};

startApp();
