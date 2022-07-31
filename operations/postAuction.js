import { PROMPTS } from '../prompts/index.js';
import chalk from 'chalk';
import { connection } from '../database/index.js';
import inquirer from 'inquirer';
import { runApp } from '../index.js';

export const postAuction = () => {
  inquirer.prompt(PROMPTS.POST).then(answer => {
    connection.query("INSERT INTO auctions SET ?", {
      itemname: answer.item.trim(),
      category: answer.category.trim(),
      startingBid: answer.startingBid,
      highestBid:  answer.startingBid,
    }).then(() => {
      console.log(chalk.green(`${itemname} was added to the list of auctionable items. Let the bidding begin!`));
      runApp();
    }).catch(err => {
      console.log(chalk.red("Could not create new auction item. Error: ", err));
    });
  });
};