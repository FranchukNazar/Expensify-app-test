import React, {Component} from 'react';
import '../index.css';
import OutputExpenses from './OutputExpenses';
import ExpensesForm from "../components/ExpensesForm";


class ExpensifyApp extends Component {
    state = {
        expenses: [],
        totalAmount: -1,
        currency: '',
        isOpenList: true
    };

    handleParse = (command) => {
        let commandArray = command.split(' ').filter(item => item);
        let commandName = commandArray[0];
        let isOpenList = true;
        switch (commandName) {
            case 'add':
                let product = commandArray.slice(4).join(' ');
                let amount = parseFloat(commandArray[2]);
                this.handleAdd(commandArray[1], amount, commandArray[3], product);
                break;
            case 'list':
                isOpenList = true;
                this.setState({isOpenList});
                this.handleSortList();
                break;
            case 'clear':
                this.handleDelete(commandArray[1]);
                break;
            case 'total':
                isOpenList = false;
                this.setState({isOpenList});
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
            this.setState({expenses : updatedExpenses});
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
            this.setState({expenses});
        }
    };
    handleSortList = () => {
        const {expenses} = this.state;
        expenses.sort((expenseA, expenseB) => Date.parse(expenseA.date) - Date.parse(expenseB.date));
        this.setState({expenses});
    };
    handleDelete = (date) => {
        const {expenses} = this.state;
        const filteredExpenses = expenses.filter(expense => expense.date !== date);
        this.setState({expenses: filteredExpenses});
    };



    handleTotalSpend = async (currency) => {
        const {expenses} = this.state;
        this.setState({currency});
        let response = await fetch(`http://data.fixer.io/api/latest?access_key=9363cdb07d0cb3b269fb3ee1a8b2e6d7&base=${currency}`);
        let currencyObj = await response.json();
        let ratesOfCurrency = currencyObj.rates;
        let totalAmount = expenses.reduce((sum, current) => {
            current.products.forEach((item) => {
                sum += parseFloat(item.amount) / parseFloat(ratesOfCurrency[item.currency]);
            });
            return sum;
        }, 0);
        this.setState({totalAmount});
    };

    render() {
        const {totalAmount, currency, isOpenList, expenses} = this.state;
        return <div className="expensify-app">
            <h1 className={'header'}>EXPENSIFY APP</h1>
            <ExpensesForm handleSubmit={this.handleParse} />
            <OutputExpenses totalAmount={totalAmount}
                            currency={currency}
                            isOpenList={isOpenList}
                            expenses={expenses}
            />
        </div>;
    }
}

export default ExpensifyApp;


