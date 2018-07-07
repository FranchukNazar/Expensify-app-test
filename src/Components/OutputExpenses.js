import React, {Component}from 'react';


class OutputExpenses extends Component {

    render () {
        const {isOpenList, totalAmount, handleRenderList, currency} = this.props;
        return (
            <div>
                {isOpenList ? handleRenderList() : ''}
                {(totalAmount >= 0 && !isOpenList) ? `${totalAmount.toFixed(2) } ${currency}` : ''}
            </div>
        )
    }
}


export default OutputExpenses;


