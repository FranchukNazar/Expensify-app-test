import React, {Component}from 'react';
import {ExpensesList} from '../../components/index'

class OutputExpenses extends Component {

    render () {
        const {isOpenList, totalAmount, expenses, currency} = this.props;
        return (
            <div className={'expenses-list'}>
                {isOpenList && <ExpensesList expenses={expenses}/>}
                <p className={'expenses-amount'}> {(totalAmount >= 0 && !isOpenList) ? `Spend in total : ${totalAmount.toFixed(2) } ${currency}` : ''}</p>
            </div>
        )
    }
}


export default OutputExpenses;


