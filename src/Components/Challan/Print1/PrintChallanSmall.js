import React, { Component } from 'react';
import './css/invoice.css';
import { PostData } from '../../../api/service';

export default class PrintChallanSmall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice_det: [],
            invoice_main: [],
            payment: [],
            isLoading: true
        }
    }

    componentDidMount() {
        let challan_no = this.props.challan_no;
        let type = this.props.type;
        const data = {
            inv_no: challan_no,
            type: type
        }
        PostData('/api/fetch_challan_single.php', data)
            .then((resp) => {
                console.log(resp);
                if (resp.status === '200') {
                    //console.log(resp.data[1]);
                    this.setState({
                        invoice_main: resp.data[0][0],
                        invoice_det: resp.data[1],
                        payment: JSON.parse(resp.data[0][0].payment),
                        isLoading: false
                    })
                }
            })
    }

    goodDate(date1) {
        if (date1 !== undefined) {
            let d = date1.split('-');
            let new_date = d[2] + '-' + d[1] + '-' + d[0];
            return new_date;
        }

    }

    pad(num) {
        if (num !== undefined) {
            let length = num.toString().length;
            let l = "0";
            for (var i = 1; i < 4 - length; i++) {
                l = l + "0";
            }

            return l + num;

        }

    }





    render() {


        let i = [];
        if (this.state.isLoading === false) {
            let invoice_det = this.state.invoice_det;
            i = invoice_det.map((el, index) =>
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.brand_name} - {el.product_name} - {el.model}</td>
                    <td>{el.hsn}</td>
                    <td align="right">{el.qty} {el.unit}</td>
                    <td align="right">{parseFloat(el.mrp).toFixed(2)}</td>
                    <td align="right">{parseFloat(el.gtot).toFixed(2)}</td>
                </tr>
            )
        }

        let j = [];
        if (this.state.isLoading === false) {
            let mop = this.state.payment.mop;
            if (mop === '1') {
                j = <span>By Cash</span>;
            } else if (mop === '2') {
                j = <span>By Cheque (Cheque No. {this.state.payment.cheque_no}, Dated: {this.goodDate(this.state.payment.cheque_date)})</span>;
            } else if (mop === '3') {
                j = <span>By Debit/Credit Card</span>;
            } else if (mop === '4') {
                j = <span style={{ color: 'red' }}>Not Paid</span>
            }
        }

        let type_text = "";
        if (this.props.type === '1') {
            type_text = "B2C";
        } else if (this.props.type === '2') {
            type_text = "B2B";
        }
        return (
            <div className="container">
                <div className="invoice">
                    <table width="100%" className="invoice-header">
                        <tbody>
                            <tr>
                                <td>
                                    <header>
                                        <h1>Sanganeria Agencies </h1>
                                        <h4>GSTIN: 18AAUFS8357C1ZL</h4>
                                    </header>
                                </td>
                                <td style={{ verticalAlign: 'middle' }}>
                                    <img src={require('./../../../assets/print-logo/print-logo.jpg')} alt="" className="invoice-logo" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td width="50%">
                                    <h4><b>Challan No. {this.pad(this.state.invoice_main.challan_no)}</b></h4>
                                </td>
                                <td width="50%" align="right">
                                    <h4><b>Challan Date. {this.goodDate(this.state.invoice_main.date_of_invoice)}</b></h4>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td valign="top" width="33%">
                                    <header>
                                        To,<br />
                                        <b>{this.state.invoice_main.customer_name}</b><br />
                                        {this.state.invoice_main.customer_address}<br />
                                        {this.state.invoice_main.customer_contact}<br />
                                        GSTIN: {this.state.invoice_main.customer_gstin}<br />
                                        STATE: {this.state.invoice_main.customer_state}

                                    </header>
                                </td>
                                <td valign="top" width="33%">
                                    From,<br />
                                    <b>Sanganeria Agencies</b><br />
                                    H.No-38, Opp. YES Bank, S.R.C.B. Road<br />
                                    Fancy Bazar, Guwahati - 781001 (Assam)<br />
                                    0361 2511961(L), +91 96784 66303(M)<br />
                                    Fancy Bazar, Guwahati - 781001 (Assam)
                </td>

                                <td valign="top" width="33%">
                                    Dispatched Through: {this.state.invoice_main.place_of_supply}<br />
                                    Consignment No: {this.state.invoice_main.c_no}<br />
                                    Date: {this.state.invoice_main.date_of_c}<br />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <table className="table table-bordered">
                        <thead>
                            <tr className="alert-warning">
                                <th>#</th>
                                <th>Description of the goods</th>
                                <th>HSN</th>
                                <th style={{ textAlign: 'right' }}>Qty</th>
                                <th style={{ textAlign: 'right' }}>Rate</th>
                                <th style={{ textAlign: 'right' }}>Total Amount (Rs.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {i}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="5" align="right">Round Off</td>
                                <td align="right">{parseFloat(this.state.invoice_main.roff).toFixed(2)}</td>
                            </tr>
                            <tr >
                                <td colSpan="5" align="right"><b>Grand Total</b></td>
                                <td align="right"><b>{parseFloat(this.state.invoice_main.gtot).toFixed(2)}</b></td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="invoice-footer" style={{ width: '100%' }}>


                        <table width="100%" className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td width="60%" align="center">
                                        <h4>RECEIVED THE ABOVE GOODS CONDITION</h4>
                                        <br />
                                        <br />
                                        <br />

                                        ......................................................<br />
                                        <h5>Receiver's Signature</h5>
                                    </td>

                                    <td width="40%" align="right">
                                        <h4>E.&amp;.O.E.</h4>
                                        <br />
                                        <br />
                                        <br />

                                        <br />
                                        <h5>For, <b>SANGANERIA AGENCIES</b></h5>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <br />
                        <br />
                        <br />


                    </div>

                </div>
            </div>
        )
    }
}
