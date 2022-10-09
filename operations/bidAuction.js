import { PROMPTS } from '../prompts/index.js';
import chalk from 'chalk';
import { connection } from '../database/index.js';
import inquirer from 'inquirer';
import { runApp } from '../index.js';

const checkForHighestBid = (bid, id) => connection.query("UPDATE auctions SET ? WHERE ?", [{
  highestBid: bid,
}, {
  id,
}]).then(() => {
  console.log(chalk.green("Bid successfullly placed!"));
  runApp();
}).catch(err => {
  console.log(chalk.red('Bid could not be placed. Error: ', err));
});

export const bidAuction = () => {
  connection.query("SELECT * FROM auctions").then(res => {
    const availableItems = res[0];
    const choices = availableItems.map(item => item.itemname);

    inquirer.prompt({
      ...PROMPTS.BID[0],
      choices: choices,
    }).then(answer => {
      const chosenItem = availableItems.find(item => item.itemname === answer.choice);

      inquirer.prompt(PROMPTS.BID[1]).then(answer => {
        if (chosenItem.highestBid < answer.bid) {
          checkForHighestBid(answer.bid, chosenItem.id);
        } else {
          console.log(chalk.yellow("Sorry, your bid was too low. Try again!"));
          runApp();
        }
      });
    }).catch(err => {
      console.log(chalk.red('The item could not be selected. Error: ', err));
    });
  });
};