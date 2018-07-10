import React from 'react';
import {ExpensesForm } from '../components/index';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({adapter: new Adapter()});

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
