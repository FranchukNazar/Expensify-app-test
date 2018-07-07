import React, {Component}from 'react';
import {ExpensesList} from '../../components/index'

class OutputExpenses extends Component {

    render () {
        const {isOpenList, totalAmount, expenses, currency} = this.props;
        return (
            <div>
                {isOpenList && <ExpensesList expenses={expenses}/>}
                {(totalAmount >= 0 && !isOpenList) ? `${totalAmount.toFixed(2) } ${currency}` : ''}
            </div>
        )
    }
}


export default OutputExpenses;


