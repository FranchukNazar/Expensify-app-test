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
            <form onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleOnChange} value={value}/>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default ExpensesForm;

