import React from 'react';
import { ExpensesList } from '../components/index';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({adapter: new Adapter()});

describe('<ExpensesList />', () => {

    it('render component empty expenses', () => {
        const list      = enzyme.shallow(<ExpensesList />);
        const expected   = '<div></div>';
        expect(list.html()).toEqual(expected);
    });

    it('render component with expenses', () => {
        const expenses = [
            {
                date: '2017-2-3',
                products: [{
                    amount: '12',
                    currency: 'EUR',
                    product: 'bread'
                }]
            }
        ];
        const list       = enzyme.shallow(<ExpensesList expenses={expenses}/>);
        const expected   = '<div><div class="expense-date"><h4>2017-2-3</h4><p class="expense-product">bread 12 EUR</p></div></div>';

        expect(list.html()).toEqual(expected);
    });

});