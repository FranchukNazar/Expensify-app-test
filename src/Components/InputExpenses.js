import React, {Component}from 'react';


class InputExpenses extends Component {
    handleOnChange = (e) => {
        this.props.handleOnChange(e.target.value);
    };

    handleParse = (e) => {
        e.preventDefault();
        const {command} = this.props;
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
                this.props.handleChangeOpenList(isOpenList);
                this.handleSortList();
                break;
            case 'clear':
                this.handleDelete(commandArray[1]);
                break;
            case 'total':
                isOpenList = false;
                this.props.handleChangeOpenList(isOpenList);
                this.handleTotalSpend(commandArray[1]);
                break;
            default:
                alert('You write wrong command');
        }

    };

    handleAdd = (date, amount, currency, product) => {
        const {expenses, handleUpdateExpenses} = this.props;
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
            handleUpdateExpenses(updatedExpenses);
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
            handleUpdateExpenses(expenses);
        }
    };
    handleSortList = () => {
        const {expenses, handleUpdateExpenses} = this.props;
        expenses.sort((expenseA, expenseB) => Date.parse(expenseA.date) - Date.parse(expenseB.date));
        handleUpdateExpenses(expenses);
    };
    handleDelete = (date) => {
        const {expenses, handleUpdateExpenses} = this.props;
        const filteredExpenses = expenses.filter(expense => expense.date !== date);
        handleUpdateExpenses(filteredExpenses);
    };

    handleTotalSpend = (currency) => {
        const {expenses, handleChangeCurrency, handleChangeTotalAmount} = this.props;
        handleChangeCurrency(currency);

           fetch(`http://data.fixer.io/api/latest?access_key=9363cdb07d0cb3b269fb3ee1a8b2e6d7&base=${currency}`).then((response) => response.json()).then(currencyObj => {
               let ratesOfCurrency = currencyObj.rates;
               let totalAmount = expenses.reduce((sum, current) => {
                   current.products.forEach((item) => {
                       sum += parseFloat(item.amount)/parseFloat(ratesOfCurrency[item.currency]);
                   });
                   return sum;
               }, 0);

               return (
                   handleChangeTotalAmount(totalAmount)
               )
           })

    };

    render () {
        return (
            <form action="" onSubmit={this.handleParse}>
                <input type="text" onChange={this.handleOnChange}/>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}

export default InputExpenses;


