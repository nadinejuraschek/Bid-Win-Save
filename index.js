/*************************************
NPM PACKAGES
*************************************/
const mysql = require('mysql');
const inquirer = require('inquirer');

/*************************************
MYSQL
*************************************/
// link database
const connection = mysql.createConnection({
    // host, port, username, password, database
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bid_win_save_db"
});

connection.connect(function(err) {
    console.log("Connected as ID: " + connection.threadId);
});

/*************************************
FUNCTIONS
*************************************/
function start() {
    inquirer.prompt({
        name: "PoB",
        type: "rawlist",
        message: "Would you like to [POST] an auction or [BID] on an auction?",
        choices: ["POST", "BID"]
    }).then(function(answer) {
        if(answer.PoB.toUpperCase()=="POST") {
            // postAuction();
        } else {
            // bidAuction();
        };
    });
};

// function postAuction() {

// };

// function bidAuction() {

// };