import React, {Component} from 'react';


/*
const expenses = [
    {
        date: '2017-3-4',
        products: [
            {
                product: 'beer',
                expenseValue: 2,
                currency: 'UAH'
            },
            {
                product: 'jogurt',
                expenseValue: 10,
                currency: 'USD'
            }
        ]
    },
    {
        date: '2017-3-3',
        products: [
            {
                product: 'beer',
                expenseValue: 2,
                currency: 'UAH'
            },
            {
                product: 'jogurt',
                expenseValue: 10,
                currency: 'USD'
            }
        ]
    }

];
*/

class ExpensifyApp extends Component {
    state = {
        command: '',
        expenses: [],
        totalAmount: 0
    };

    handleOnChange = (e) => {
        this.setState({command: e.target.value});
    };

    handleParse = () => {
        let {command} = this.state;
        let commandArray = command.split(' ').filter(item => item);
        let nameOfCommand = commandArray[0];
        switch (nameOfCommand) {
            case 'add':
                alert('add');
                let product = commandArray.slice(4).join(' ');
                let amount = parseFloat(commandArray[2]);
                this.handleAdd(commandArray[1], amount, commandArray[3], product);
                break;
            case 'list':
                alert('list');
                this.handleSortList();
                break;
            case 'clear':
                alert('clear');
                this.handleDelete(commandArray[1]);
                break;
            case 'total':
                alert('total');
                this.handleTotalSpend(commandArray[1]);
                break;
            default:
                alert('You write command wrong');
        }

    };

    handleAdd = (date, amount, currency, product) => {
        const {expenses} = this.state;
        if (expenses.length > 0) {
            let isNotUsedNewDate = true;
            const updatedExpenses = expenses.reduce((result, expense, index, array) => {
                if (expense.date === date) {
                    expense.products.push({
                        amount,
                        currency,
                        product
                    });
                    result.push(expense);
                    isNotUsedNewDate = false;
                }
                else if (index === (array.length - 1) && isNotUsedNewDate) {
                    result.push(expense);
                    result.push({
                        date,
                        products: [{
                            amount,
                            currency,
                            product
                        }]
                    })
                }
                else {
                    result.push(expense)
                }

                return result;
            }, []);
            this.setState({expenses: updatedExpenses}, () => {
                console.log(this.state)
            });
        }
        else {
            expenses.push({
                date,
                products: [{
                    amount,
                    currency,
                    product
                }]
            });
            this.setState({expenses}, () => {
                console.log(this.state)
            });

        }

        this.handleRenderList();

    };
    handleSortList = () => {
        const {expenses} = this.state;
        expenses.sort((expenseA, expenseB) => Date.parse(expenseA.date) - Date.parse(expenseB.date));
        this.setState({expenses}, () => {
            console.log(this.state);
        });
        this.handleRenderList();
    };

    handleRenderList = () => {
        const {expenses} = this.state;

        return expenses.map((expense, index) => {
            return (
                <div key={index + 1000}>
                    <h4 key={index}>{expense.date}</h4>
                    {expense.products.map((nameOfExpense, index) => <p
                        key={index + 100}>{`${nameOfExpense.product} ${nameOfExpense.amount} ${nameOfExpense.currency}`}</p>)}
                </div>
            );
        });
    };
    handleDelete = (date) => {
        const {expenses} = this.state;
        const filteredExpenses = expenses.filter(expense => expense.date !== date);
        this.setState({expenses: filteredExpenses}, () => {
            console.log(this.state)
        });
    };

    handleTotalSpend = (currency) => {

        // const {expenses} = this.state;
        const expenses = [
            {
                date: '2017-3-4',
                products: [
                    {
                        product: 'beer',
                        amount: 30,
                        currency: 'UAH'
                    },
                    {
                        product: 'jogurt',
                        amount: 10,
                        currency: 'USD'
                    }
                ]
            },
            {
                date: '2017-3-3',
                products: [
                    {
                        product: 'beer',
                        amount: 30,
                        currency: 'UAH'
                    },
                    {
                        product: 'jogurt',
                        amount: 10,
                        currency: 'USD'
                    }
                ]
            }

        ];

/*        function readData() {
            let url = `http://data.fixer.io/api/latest?access_key=9363cdb07d0cb3b269fb3ee1a8b2e6d7&base=${currency}`;
           return fetch(url).then(response => response.json()).catch(alert);
        }

        async function main() {
            let currensyObject = await readData();
            return currensyObject.rates;
        }*/


        // console.log(main());


        async function readData() {
            let response  = await fetch(`http://data.fixer.io/api/latest?access_key=9363cdb07d0cb3b269fb3ee1a8b2e6d7&base=${currency}`);
            let currencyObj = await response.json();
            let ratesOfCurrency = currencyObj.rates;
            let totalAmount = expenses.reduce((sum, current) => {
                return sum + current.products.reduce((sum, current) => {
                    console.log(current.amount);
                    return sum + parseFloat(current.amount)/parseFloat(ratesOfCurrency[current.currency]);
                }, 0);

            }, 0);
            console.log(totalAmount);
            this.setState({totalAmount}, () => {
                console.log(this.state)
            });

        }
        readData();


         // let ratesOfCurrency = {
         //     'UAH': 30,
         //     'USD': 2
         // };

/*        let totalAmount = expenses.reduce((sum, current) => {
            return sum + current.products.reduce((sum, current) => {
                console.log(current.amount);
                return sum + parseFloat(current.amount)/parseFloat(ratesOfCurrency[current.currency]);
            }, 0);

        }, 0);
        this.setState({totalAmount}, () => {
            console.log(this.state)
        });*/
    };

    render() {
        return <div className="ExpensifyApp">
            <input type="text" onChange={this.handleOnChange}/>
            <button onClick={this.handleParse}>Submit</button>
            <div>
                {this.handleRenderList()}
            </div>

        </div>;
    }
}

export default ExpensifyApp;


