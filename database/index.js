import * as dotenv from 'dotenv';

import chalk from 'chalk';
import mysql from 'mysql2/promise';
import { runApp } from '../index.js';

dotenv.config();

export let connection;

export const createConnection = async () => {
  await mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: 'root',
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
}).then(res => {
    console.log(chalk.green("Database connected as ID: " + res.threadId));
    connection = res;
  })
  .catch(err => {
    if (err) throw err;
  });
};

const createTableQuery = "CREATE TABLE auctions (id INT AUTO_INCREMENT PRIMARY KEY, itemname VARCHAR(255), category VARCHAR(255), startingBid INT, highestBid INT)";

const tableExists = async (tableName) => {
  try {
    const checkForTableQuery = `SELECT 1 FROM ${tableName} LIMIT 1;`;
    await connection.execute(checkForTableQuery);
  } catch (err) {
    console.log(chalk.yellow("Table 'Auctions' does not exist, creating..."));

    await connection.query(createTableQuery).then(() => {
      console.log(chalk.green("Table created"));
    }).catch(err => {
      if (err) throw err;
    });
  }
};

export const databaseConnection = async () => {
  await tableExists("auctions");
  runApp();
};
