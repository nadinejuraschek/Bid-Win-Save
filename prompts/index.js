import { validateNumber } from '../utils/validation.js';

export const PROMPTS = {
  OPERATION: [
    {
      name: "PoB",
      type: "rawlist",
      message: "Would you like to [POST] an auction or [BID] on an auction?",
      choices: ["POST", "BID"]
    },
  ],
  BID: [
    {
      name: "choice",
      type: "rawlist",
      message: "Which item would you like to place a bid on?",
    },
    {
      name: "bid",
      type: "input",
      message: "How high would you like to bid?",
      validate: validateNumber,
    },
  ],
  POST: [
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
      validate: validateNumber,
    },
  ],
};