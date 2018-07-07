import React, {Component} from 'react';
import InputExpenses from '../Components/InputExpenses';
import OutputExpenses from '../Components/OutputExpenses';


class ExpensifyApp extends Component {
    state = {
        command: '',
        expenses: [],
        totalAmount: -1,
        currency: '',
        isOpenList: true
    };

    handleOnChange = (command) => {
        this.setState({command});
    };

    handleChangeOpenList = (isOpenList) => {
        this.setState({isOpenList});
    };
    handleChangeCurrency = (currency) => {
        console.log(currency);
        this.setState({currency});
    };
    handleChangeTotalAmount = (totalAmount) => {
        this.setState({totalAmount});
    };

    handleUpdateExpenses = (expenses) => {
        this.setState({expenses});
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


    render() {
        const {totalAmount, currency, isOpenList, command, expenses} = this.state;
        return <div className="expensify-app">

            <InputExpenses handleOnChange={this.handleOnChange}
                           handleParse={this.handleParse}
                           handleChangeOpenList={this.handleChangeOpenList}
                           handleUpdateExpenses={this.handleUpdateExpenses}
                           handleChangeCurrency={this.handleChangeCurrency}
                           handleChangeTotalAmount={this.handleChangeTotalAmount}
                           command={command}
                           totalAmount={totalAmount}
                           currency={currency}
                           isOpenList={isOpenList}
                           expenses={expenses}
            />
            <OutputExpenses totalAmount={totalAmount}
                            currency={currency}
                            isOpenList={isOpenList}
                            handleRenderList={this.handleRenderList}
            />
        </div>;
    }
}

export default ExpensifyApp;


