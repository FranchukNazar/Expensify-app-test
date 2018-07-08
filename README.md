# Expensify App #

***

Application alllows user to track how much money he spent.
User can enter the command and see the results of it's execution.

---

## How to run


* clone git repository with command in terminal `git clone`;

* install dependencies with command in terminal `yarn install`;

* run webpack and start server with command in terminal `yarn start`;

---

## Supported commands

| Command | Description of command | Example | Description of parameters|
|:---|:---|:---|:---|
| `add` | adds expense entry to the list of users expenses | `add 2017-03-22 12 USD Jogurt` |  First parameter `add` — command; Second parameter `2017-03-22` — date when expense occured (year, month  `01-12`, day `01-30`); Third parameter `12` — is an amount; Forth parameter `USD` — the currency in which expense occured ; Fifth parameter `Jogurt` — is the name of product|
| `list` |  shows the list of all expenses sorted by date |  `list` | One parameter `list` — command |
| `clear` | removes all expenses for specified date | `clear 2017-03-22` | First parameter `clear` — command; Second parameter `2017-03-22` — is the date for which all expenses should be removed |
| `total` | calculate the total amount of spent money and present it to user in specified currency | `total EUR` |First parameter `total` — command; Second parameter `EUR` — is the currency in which total amount of expenses should be presented; Only EUR is supported because of paid account in [fixer.io](https://fixer.io/)  |



## Technologies

 * ES6

 * React.js

 * Webpack

 * Fetch

 * CSS

