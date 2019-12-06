/*************************************
NPM PACKAGES
*************************************/
const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

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
            bidAuction();
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

function bidAuction() {
    connection.query("SELECT * FROM auctions", function(err, res) {
        console.table(res);
        inquirer.prompt({
            name: "choice",
            type: "rawlist",
            choices: function(value){
                var choiceArray = [];
                for (var i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].itemname);
                } return choiceArray;
            },
            message: "Which item would you like to place a bid on?"
        }).then(function(answer) {
            for (var i=0; i<res.length; i++) {
                if(res[i].itemname == answer.choice) {
                    var chosenItem = res[i];
                    inquirer.prompt({
                        name: "bid",
                        type: "input",
                        message: "How high would you like to bid?",
                        validate: function(value) {
                            if (isNaN(value) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }).then(function(answer) {
                        if (chosenItem.highestBid < parseInt(answer.bid)){
                            connection.query("UPDATE auctions SET ? WHERE ?", [{
                                highestBid: answer.bid
                            }, {
                                id: chosenItem.id
                            }], function(err, res){
                                console.log("Bid successfullly placed!");
                                start();
                            });
                        } else {
                            console.log("Sorry, your bid was too low. Place a new bid!");
                            start();
                        };
                    });
                };
            };
        });
    });
};