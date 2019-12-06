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
    start();
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
            postAuction();
        } else {
            // bidAuction();
        };
    });
};

function postAuction() {
    inquirer.prompt([
    {
        name: "item",
        type: "input",
        message: "What is the item you wish to submit?"
    },
    {
        name: "category",
        type: "input",
        message: "Which category would you place it in?"
    },
    {
        name: "startingBid",
        type: "input",
        message: "What is your starting bid?",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(answer) {
        connection.query("INSERT INTO auctions SET ?", {
            itemname: answer.item,
            category: answer.category,
            startingBid: answer.startingBid,
            highestBid:  answer.startingBid 
        }, function(err, res) {
            console.log("Let the bidding begin!"); 
            start();
        });
    });
};

// function bidAuction() {

// };