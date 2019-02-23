import React, { Component } from 'react'
import PaymentMulti from './PaymentMulti';

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
            challan_no: '',
            date_of_challan: '',
            po_no: '',
            date_of_po: '',
            transporter: '',
            cheque_no: '',
            cheque_date: '',
            notpaid: false,
            roff: '',
            c_charge: '',
            narration: '',
            errors: [],
            payments: []
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
        if(this.props.fromChallan){
            this.setState({
                ...this.props.challan_data
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this._getGtot();
            if (this.props.fromChallan) {
                this.setState({
                    ...this.props.challan_data
                })
            }
        }
    }

    handleValidation = () => {
        let { customer_id } = this.state;
        let errors = this.state.errors;
        let isValid = true;

        if (customer_id === '') {
            isValid = false;
            errors['customer_id'] = 'Please select customer';
        }

        this.setState({
            errors
        })

        return isValid;


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

        if(this.handleValidation()){
            let invoice_det = JSON.parse(localStorage.getItem('invoice_det'));
            let type = localStorage.getItem('type');
            const data = {
                date_of_invoice: this.state.date_of_invoice,
                customer_id: this.state.customer_id,
                payment: this.state.payments,
                gtot: this.state.gtot,
                type: type,
                place_of_supply: this.state.place_of_supply,
                challan_no: this.state.challan_no,
                date_of_challan: this.state.date_of_challan,
                po_no: this.state.po_no,
                narration: this.state.narration,
                date_of_po: this.state.date_of_po,
                transporter: this.state.transporter,
                roff: invoice_det.main_data.roff,
                c_charge: this.state.c_charge,
                billed_amount: invoice_det.main_data.billed_amount,
                tax: invoice_det.main_data.grand_tax,
                table_data: invoice_det.table_data
            }
            //console.log(data)
            this.props.finalSubmit(data);
        }
        

    }

    onPaymentChange = (data) => {
        this.setState({
            payments: data
        })
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
                                    <label>Select Customer <span style={{color: 'red'}}>{this.state.errors['customer_id']}</span></label>
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
                                <td colSpan="3">
                                    <PaymentMulti
                                        onPaymentChange={this.onPaymentChange.bind(this)}
                                        value={this.state.payments}
                                    />
                                </td>
                                
                            </tr>
                            <tr style={{ height: '60px' }}>
                                <td>
                                    <label>Place of Supply</label>
                                    <input
                                        className="form-control input-sm"
                                        name="place_of_supply"
                                        value={this.state.place_of_supply}
                                        onChange={this.handleChange} />
                                </td>
                                <td>
                                    <label>Challan No</label>
                                    <input
                                        className="form-control input-sm"
                                        name="challan_no"
                                        value={this.state.challan_no}
                                        onChange={this.handleChange} />
                                </td>
                                <td>
                                    <label>Date of Challan</label>
                                    <input
                                        type="date"
                                        className="form-control input-sm"
                                        name="date_of_challan"
                                        value={this.state.date_of_challan}
                                        onChange={this.handleChange} />
                                </td>
                                <td>
                                    <label>P.O. No</label>
                                    <input
                                        className="form-control input-sm"
                                        name="po_no"
                                        value={this.state.po_no}
                                        onChange={this.handleChange} />
                                </td>
                                <td>
                                    <label>Date of P.O.</label>
                                    <input
                                        type="date"
                                        className="form-control input-sm"
                                        name="date_of_po"
                                        value={this.state.date_of_po}
                                        onChange={this.handleChange} />
                                </td>
                                <td>
                                    <label>Transporter/Delivered to</label>
                                    <input
                                        className="form-control input-sm"
                                        name="transporter"
                                        value={this.state.transporter}
                                        onChange={this.handleChange} />
                                </td>
                            </tr>
                            <tr style={{ height: '60px' }}>
                                <td colSpan="6">
                                    <label>Remarks / Description</label>
                                    <textarea
                                        className="form-control input-sm"
                                        name="narration"
                                        value={this.state.narration}
                                        onChange={this.handleChange}
                                        placeholder="Remarks"
                                    ></textarea>
                                </td>
                            </tr>

                            
                        </tbody>
                    </table>



                    <br />



                    <table width="100%" >
                        <tbody>
                            <tr style={{ height: '60px' }}>
                                <td colSpan="6" align="right">
                                    <button type="submit" className="btn btn-primary">Generate &amp; Print</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}
