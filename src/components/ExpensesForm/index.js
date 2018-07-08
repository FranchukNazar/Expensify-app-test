import React, {Component} from 'react';

class ExpensesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    handleOnChange = (e) => {
        this.setState({value: e.target.value});
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const {value} = this.state;
        const {handleSubmit} = this.props;
        handleSubmit(value);
    };
    render() {
        const {value} = this.state;
        return (
            <form onSubmit={this.handleSubmit} className={'expenses-form'}>
                <input type="text" onChange={this.handleOnChange} value={value} className={'expenses-form-text'} placeholder={'write your command and expense'}/>
                <input type="submit" value="Run" className={'expenses-form-submit'}/>
            </form>
        );
    }
}

export default ExpensesForm;

