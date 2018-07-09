import React, {Component} from 'react';

class ExpensesList extends Component {

    render() {
        const {expenses} = this.props;
        return (
            <div>
                {expenses && expenses.map((expense, index) => {
                    return (
                        <div key={index} className={'expense-date'}>
                            <h4 key={index}>{expense.date}</h4>
                            {expense.products.map((nameOfExpense, index) => {
                                return (
                                    <p key={index} className={'expense-product'}>
                                        {`${nameOfExpense.product} ${nameOfExpense.amount} ${nameOfExpense.currency}`}
                                    </p>
                                );
                            })
                            }
                        </div>
                    );
                })}
            </div>
        );

    }
}

export default ExpensesList;