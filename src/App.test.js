import React from 'react';
import ReactDOM from 'react-dom';
import ExpensifyApp from '../src/containers/ExpensifyApp';
import { ExpensesList, ExpensesForm } from './components';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({adapter: new Adapter()});

describe('Rendering App', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ExpensifyApp/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe('<ExpensesList />', () => {

    it('render component empty expenses', () => {
        const list      = enzyme.shallow(<ExpensesList />);
        const epected   = '<div></div>';

        expect(list.html()).toEqual(epected);
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
        const list      = enzyme.shallow(<ExpensesList expenses={expenses}/>);
        const expected   = '<div><div class="expense-date"><h4>2017-2-3</h4><p class="expense-product">bread 12 EUR</p></div></div>';

        expect(list.html()).toEqual(expected);
    });

});

describe('<ExpensesForm />', () => {

    it(' handleSubmit ', () => {
        const handleSubmit = (value) => {
            expect(value).toEqual('test');
        };
        const form = enzyme.shallow(<ExpensesForm handleSubmit = {handleSubmit}/>);
        form.find('input.expenses-form-text').simulate('change', { target: { value:'test' }});
        form.simulate('submit');
    });

    it('onChange', () => {
        const handleSubmit = (value) => {};
        const form = enzyme.shallow(<ExpensesForm handleSubmit = { handleSubmit }/>);
        form.find('input.expenses-form-text').simulate('change', { target: { value:'test' }});
        form.simulate('submit');
        expect(form.instance().state.value).toEqual('test');
    });
});


















