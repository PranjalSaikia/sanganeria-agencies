import React, { Component } from 'react'

export default class PaymentMulti extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mop: '1',
            cheque_no: '',
            cheque_date: '',
            amount_paid: '',
            date_of_payment: '',
            notpaid: false,
            payments: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.setState({
            payments: this.props.value
        })
       
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props){
            this.setState({
                payments: this.props.value
            })
        }
    }
    

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        if (e.target.name === 'mop' && e.target.value === '6') {
            let mop = e.target.value;
            if(mop === '6'){
                this.setState({
                    notpaid: true
                })
            }else{
                this.setState({
                    notpaid: false
                })
            }
            
        }
    }

    onDelete = (index) => {
        let payments = this.state.payments;

        payments.splice(index, 1);
        this.setState({
            payments
        })
    }

    addPayment = () => {


        let { mop, cheque_no, cheque_date, amount_paid, date_of_payment } = this.state;

        let data = {
            mop, cheque_no, cheque_date, amount_paid, date_of_payment
        }

        let payments = this.state.payments;

        payments.push(data);

        //send the data to parent

        this.props.onPaymentChange(payments);
        this.setState({
            payments: payments,
            mop: '1',
            cheque_no: '',
            cheque_date: '',
            amount_paid: '',
            date_of_payment: '',
        })
    }


    render() {
        //payment options
        let j = [];
        let mop = this.state.mop;
        if (mop === '2') {
            j = <div>
                <input
                    className="form-control input-sm"
                    name="cheque_no"
                    placeholder="Cheque No"
                    value={this.state.cheque_no}
                    onChange={this.handleChange} />
                <input
                    type="date"
                    className="form-control input-sm"
                    name="cheque_date"
                    value={this.state.cheque_date}
                    onChange={this.handleChange} />
            </div>
        }


        // show payments

        let k = [];

        let payments = this.state.payments;
        if (Array.isArray(payments) && payments.length > 0) {
            k = payments.map((el, index) => {
                let i = '';
                if (el.mop === '1') {
                    i = 'By Cash';
                } else if (el.mop === '2') {
                    i = "By Cheque: Cheque No. " + el.cheque_no + " dated: " + el.cheque_date;
                } else if (el.mop === '3') {
                    i = "By Debit Card";
                } else if (el.mop === '4') {
                    i = "By VIJAYA BANK";
                }else if (el.mop === '5') {
                    i = "By Finance";
                } else if (el.mop === '6') {
                    i = "Not Paid";
                }
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{i}</td>
                        <td>{el.amount_paid}</td>
                        <td>{el.date_of_payment}</td>
                        <td><i onClick={this.onDelete.bind(this, index)} className="fa fa-trash"></i></td>
                    </tr>
                )

            })
        }

        return (
            <div style={{ backgroundColor: 'white', padding: '20px' }}>

                <table width="100%">
                    <tbody>
                        <tr>
                            <td style={{ verticalAlign: 'top' }}>
                                <label>Mode</label>
                                <select
                                    className="form-control input-sm"
                                    name="mop"
                                    value={this.state.mop}
                                    onChange={this.handleChange} >
                                    <option value="1">Cash</option>
                                    <option value="2">Cheque</option>
                                    <option value="3">Debit Card</option>
                                    {/* <option value="4">VIJAYA BANK</option> */}
                                    <option value="5">Finance</option>
                                    <option value="6">Not Paid</option>
                                </select>
                                {j}
                            </td>
                            <td>
                                <label>Amount Paid</label>
                                <input
                                    className="form-control input-sm"
                                    name="amount_paid"
                                    value={this.state.amount_paid}
                                    onChange={this.handleChange}
                                    readOnly={this.state.notpaid} />

                            </td>
                            <td>
                                <label>Date of Payment</label>
                                <input
                                    type="date"
                                    className="form-control input-sm"
                                    name="date_of_payment"
                                    value={this.state.date_of_payment}
                                    onChange={this.handleChange} />
                            </td>
                            <td>
                                <button type="button" onClick={this.addPayment} style={{ marginTop: '23px' }} className="btn btn-sm">Add Payment</button>
                            </td>
                        </tr>
                    </tbody>


                </table>


                <br />
                <br />

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Mode of Payment</td>
                            <td>Amount Paid</td>
                            <td>Date of Payment</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {k}
                    </tbody>
                </table>


            </div>
        )
    }
}
