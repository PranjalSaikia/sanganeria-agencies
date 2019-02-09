import React, { Component } from 'react'

export default class InvoiceDet extends Component {
    constructor(props) {
        super(props);
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;

        this.state = {
            date_of_invoice: today,
            customer_id: '',
            mop: '1',
            gtot: '',
            amount_paid: '',
            balance: '',
            place_of_supply: '',
            c_no: '',
            date_of_c: '',
            po_no: '',
            date_of_po: '',
            transporter: '',
            cheque_no: '',
            cheque_date: '',
            notpaid: false,
            roff: '',
            c_charge: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    _getGtot() {
        let gtot = localStorage.getItem('gtot');
        this.setState({
            gtot: gtot
        })
    }

    componentDidMount() {
        this._getGtot();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this._getGtot();
        }
    }


    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

        if (e.target.name === 'mop') {
            let mop = e.target.value;
            if (mop === '4') {
                this.setState({
                    notpaid: true
                })
            } else {
                this.setState({
                    notpaid: false
                })
            }
        }

        if (e.target.name === 'amount_paid') {
            this._getGtot();
            let gtot = this.state.gtot;
            let amount_paid = e.target.value;
            let balance = parseFloat(gtot) - parseFloat(amount_paid);
            this.setState({
                balance: balance.toFixed(2)
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let invoice_det = JSON.parse(localStorage.getItem('invoice_det'));
        let type = localStorage.getItem('type');
        const data = {
            date_of_invoice: this.state.date_of_invoice,
            customer_id: this.state.customer_id,
            payment: {
                mop: this.state.mop,
                amount_receivable: this.state.gtot,
                cheque_no: this.state.cheque_no,
                cheque_date: this.state.cheque_date,
                amount_paid: this.state.amount_paid,
                balance: this.state.balance,
            },
            gtot: this.state.gtot,
            type: type,
            place_of_supply: this.state.place_of_supply,
            c_no: this.state.c_no,
            date_of_c: this.state.date_of_c,
            po_no: this.state.po_no,
            date_of_po: this.state.date_of_po,
            transporter: this.state.transporter,
            roff: invoice_det.main_data.roff,
            c_charge: this.state.c_charge,
            billed_amount: invoice_det.main_data.billed_amount,
            tax: invoice_det.main_data.grand_tax,
            table_data: invoice_det.table_data
        }


        this.props.finalSubmit(data);

    }



    render() {
        let customers = this.props.customers;
        let i = [];
        if (customers.length > 0) {
            i = customers.map((el, index) =>
                <option key={index} value={el.customer_id}>{el.customer_name}</option>)
        }

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
        return (
            <div className="container bglight">
                <form onSubmit={this.handleSubmit}>
                    <table windth="100%" className="table">
                        <tbody>
                            <tr style={{ height: '60px' }}>
                                <td>
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        className="form-control input-sm"
                                        name="date_of_invoice"
                                        value={this.state.date_of_invoice}
                                        onChange={this.handleChange}
                                    />
                                </td>
                                <td>
                                    <label>Select Customer</label>
                                    <select
                                        className="form-control input-sm"
                                        name="customer_id"
                                        value={this.state.customer_id}
                                        onChange={this.handleChange} >
                                        <option value="">Choose Customer</option>
                                        {i}
                                    </select>
                                </td>
                                <td><br />
                                    <button className="btn btn-sm" type="button" onClick={this.props.showModal}>+ Customer</button>
                                </td>
                                {/* <td>
                                    <label>Mode of Payment</label>
                                    <select
                                        className="form-control input-sm"
                                        name="mop"
                                        value={this.state.mop}
                                        onChange={this.handleChange} >
                                        <option value="1">Cash</option>
                                        <option value="2">Cheque</option>
                                        <option value="3">VIJAYA BANK</option>
                                        <option value="4">HDFC BANK</option>
                                        <option value="5">PAYTM</option>
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
                                    <label>Balance</label>
                                    <input
                                        className="form-control input-sm"
                                        name="balance"
                                        value={this.state.balance}
                                        onChange={this.handleChange} />
                                </td> */}
                                <td>
                                    <label>Dispatched Through</label>
                                    <input
                                        className="form-control input-sm"
                                        name="place_of_supply"
                                        value={this.state.place_of_supply}
                                        onChange={this.handleChange} />
                                </td>
                                <td>
                                    <label>Consignment No</label>
                                    <input
                                        className="form-control input-sm"
                                        name="c_no"
                                        value={this.state.c_no}
                                        onChange={this.handleChange} />
                                </td>
                                <td>
                                    <label>Date</label>
                                    <input
                                        type="date"
                                        className="form-control input-sm"
                                        name="date_of_c"
                                        value={this.state.date_of_c}
                                        onChange={this.handleChange} />
                                </td>
                            </tr>
                            <tr style={{ height: '60px' }}>
                                <td colSpan="6" align="right">
                                    <button type="submit" className="btn btn-primary">Generate &amp; Print</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                </form>
            </div>
        )
    }
}
