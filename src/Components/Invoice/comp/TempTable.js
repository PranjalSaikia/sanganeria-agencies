import React, { Component } from 'react'

export default class TempTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            billed_amount: '0.00',
            grand_tax: '0.00',
            grand_tot: '0.00',
            roff: '0.00',
            grand_tot_all: '0.00'
        }

        this.handleChange = this.handleChange.bind(this);

    }

    componentDidUpdate = (prevProps) => {
        if (this.props !== prevProps) {
            this.calculate();
        }
    }

    componentDidMount() {
        this.calculate();
    }

    calculate(roff) {
        let data = this.props.data;
        let bill = 0;
        if (roff === undefined || roff === '') {
            roff = 0;
        }

        //calculate billed amount
        if (data.length > 0) {
            data.map((el, index) => bill += parseFloat(el.amount));
            this.setState({
                billed_amount: bill.toFixed(2)
            })
        } else {
            this.setState({
                billed_amount: '0.00'
            })
        }

        let tax_temp = 0;
        if (data.length > 0) {
            data.map((el, index) => tax_temp += parseFloat(el.tax));
            this.setState({
                grand_tax: tax_temp.toFixed(2)
            })
        } else {
            this.setState({
                grand_tax: '0.00'
            })
        }

        let gtot = bill + tax_temp;

        let gtot_all = gtot + parseFloat(roff);


        this.setState({
            billed_amount: bill.toFixed(2),
            grand_tax: tax_temp.toFixed(2),
            grand_tot: gtot.toFixed(2),
            grand_tot_all: gtot_all.toFixed(2),
            roff
        })
        let new_data = {
            table_data: data,
            main_data: {
                billed_amount: bill.toFixed(2),
                grand_tax: tax_temp.toFixed(2),
                grand_tot_all: gtot_all.toFixed(2),
                roff
            }
        }

        this.props.onSetData(new_data);



    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

        if (e.target.name === 'roff') {
            this.calculate(e.target.value);
        }
    }

    onDelete(index) {
        this.props.onDelete(index);
        this.calculate();
    }

    onEdit(el, index) {
        this.props.onEdit(el, index);
        this.calculate();
    }
    render() {
        let items = this.props.data;
        let i = [];
        if (items.length > 0) {
            i = items.map((el, index) => {
                let ii = "";
                if (el.imei !== "" || el.imei !== 'undefined'){
                    ii = `(${el.imei})`;
                }
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{el.barcode} {ii}</td>
                        <td>{el.qty}</td>
                        <td>{el.amount}</td>
                        <td>{el.tax}</td>
                        <td>{el.gtot}</td>
                        <td><a onClick={this.onEdit.bind(this, el, index)}><i className="fa fa-edit"></i></a></td>
                        <td><a onClick={this.onDelete.bind(this, el.index)}><i className="fa fa-trash"></i></a></td>
                    </tr>
                )
            }
            )
        }
        return (
            <div>
                <table width="100%" className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Barcode</th>
                            <th>Qty</th>
                            <th>Amount</th>
                            <th>GST</th>
                            <th>Total</th>
                            <th><i className="fa fa-edit"></i></th>
                            <th><i className="fa fa-trash"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {i}
                    </tbody>
                </table>

                <table width="100%">
                    <tbody>
                        <tr>
                            <td colSpan="2">Billed Amount</td>
                            <td><input
                                className="form-control input-sm"
                                name="billed_amount"
                                value={this.state.billed_amount}
                                onChange={this.handleChange}
                            /></td>
                        </tr>
                        <tr>
                            <td colSpan="2">Total Tax</td>
                            <td><input
                                className="form-control input-sm"
                                name="grand_tax"
                                value={this.state.grand_tax}
                                onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td colSpan="2">Grand Total</td>
                            <td><input
                                className="form-control input-sm"
                                name="grand_tot"
                                value={this.state.grand_tot}
                                onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td colSpan="2">Round off</td>
                            <td><input
                                className="form-control input-sm"
                                name="roff"
                                value={this.state.roff}
                                onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td colSpan="2">Grand Total</td>
                            <td><input
                                className="form-control input-sm"
                                name="grand_tot_all"
                                value={this.state.grand_tot_all}
                                onChange={this.handleChange} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
