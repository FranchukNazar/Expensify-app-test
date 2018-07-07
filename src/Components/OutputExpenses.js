import React from 'react';


const OutputExpenses = (props) => (
    <div>
        {props.isOpenList ? props.handleRenderList() : ''}
        {(props.totalAmount >= 0 && !props.isOpenList) ? `${props.totalAmount.toFixed(2) } ${props.currency} ` : ''}
    </div>
);

export default OutputExpenses;


