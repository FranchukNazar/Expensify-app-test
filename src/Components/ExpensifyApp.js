import React, {Component} from 'react';
import InputExpenses from './InputExpenses';
import OutputExpenses from './OutputExpenses';

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
        totalAmount: -1,
        currency: '',
        isOpenList: true
    };

    handleOnChange = (e) => {
        this.setState({command: e.target.value});
    };

    handleParse = () => {
        const {command} = this.state;
        let commandArray = command.split(' ').filter(item => item);
        let commandName = commandArray[0];
        switch (commandName) {
            case 'add':
                let product = commandArray.slice(4).join(' ');
                let amount = parseFloat(commandArray[2]);
                this.handleAdd(commandArray[1], amount, commandArray[3], product);
                break;
            case 'list':
                this.setState({isOpenList: true});
                this.handleSortList();
                break;
            case 'clear':
                this.handleDelete(commandArray[1]);
                break;
            case 'total':
                this.setState({isOpenList: false});
                this.handleTotalSpend(commandArray[1]);
                break;
            default:
                alert('You write wrong command');
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
                <div key={index}>
                    <h4 key={index}>{expense.date}</h4>
                    {expense.products.map((nameOfExpense, index) => <p
                        key={index}>{`${nameOfExpense.product} ${nameOfExpense.amount} ${nameOfExpense.currency}`}</p>)}
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

    handleTotalSpend = (currency = 'EUR') => {
        this.setState({currency});
        const {expenses} = this.state;
        let readData = async function  () {
            let response  = await fetch(`http://data.fixer.io/api/latest?access_key=9363cdb07d0cb3b269fb3ee1a8b2e6d7&base=${currency}`);
            let currencyObj = await response.json();
            let ratesOfCurrency = currencyObj.rates;
            let totalAmount = expenses.reduce((sum, current) => {
                current.products.forEach((item) => {
                    sum += parseFloat(item.amount)/parseFloat(ratesOfCurrency[item.currency]);
                });
                return sum;
            }, 0);
            console.log(totalAmount);
            console.log(this);
            this.setState({totalAmount});

        }.bind(this);
        readData();

    };

    render() {
        const {totalAmount, currency, isOpenList} = this.state;
        return <div className="expensify-app">

            <InputExpenses handleOnChange={this.handleOnChange} handleParse={this.handleParse}/>

            {/*<input type="text" onChange={this.handleOnChange}/>*/}
            {/*<button onClick={this.handleParse}>Submit</button>*/}

            <OutputExpenses totalAmount={totalAmount} currency={currency} isOpenList={isOpenList} handleRenderList={this.handleRenderList}/>
        </div>;
    }
}

export default ExpensifyApp;


