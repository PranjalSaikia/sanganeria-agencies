import React, { Component } from 'react';
import './css/invoice.css';
import { PostData } from './../../../api/service';

export default class PrintInvoice extends Component {
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
        let invoice_no = this.props.match.params.id;
        let type = this.props.match.params.type;
        const data = {
            inv_no: invoice_no,
            type: type
        }
        PostData('/api/fetch_invoice_single.php', data)
            .then((resp) => {
                //console.log(resp);
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

    goodDate(date1){
        if(date1 !== undefined){
            let d = date1.split('-');
            let new_date = d[2] + '-' + d[1] + '-' + d[0];
            return new_date;
        }
        
    }

    pad(num){
        if(num !== undefined){
            let length = num.toString().length;
            let l = "0";
            for(var i=1; i < 4-length; i++){
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
            {   
                let ii = "";
                //console.log(el.imei)
                if(el.imei !== null){
                    ii = `IMEI: ${el.imei}`;
                }
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{el.brand_name} - {el.product_name} - {el.model} <br/>{ii}</td>
                        <td>{el.hsn}</td>
                        <td align="right">{el.qty} {el.unit}</td>
                        <td align="right">{parseFloat(el.amount).toFixed(2)}</td>
                        <td align="right">{(parseFloat(el.amount) * parseFloat(el.cgst) / 100).toFixed(2)}</td>
                        <td align="right">{(parseFloat(el.amount) * parseFloat(el.sgst) / 100).toFixed(2)}</td>
                        <td align="right">{(parseFloat(el.amount) * parseFloat(el.igst) / 100).toFixed(2)}</td>
                        <td align="right">{parseFloat(el.gtot).toFixed(2)}</td>
                    </tr>
                )
            }
                
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
        if (this.state.invoice_main.type === '0') {
            type_text = "B2C";
        } else if (this.state.invoice_main.type === '1') {
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
                                        <h1>Sanganeria Agencies</h1>
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
                                    <h4><b>Invoice No. {type_text}/{this.pad(this.state.invoice_main.inv_no)}</b></h4>
                                </td>
                                <td width="50%" align="right">
                                    <h4><b>Invoice Date. {this.goodDate(this.state.invoice_main.date_of_invoice)}</b></h4>
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
                                    Challan No: {this.state.invoice_main.challan_no}<br />
                                    Challan Date: {this.state.invoice_main.date_of_challan}<br />
                                    Place of Supply: {this.state.invoice_main.place_of_supply}<br />
                                    Transporter: {this.state.invoice_main.transporter}<br />
                                    P.O. No.: {this.state.invoice_main.po_no}<br />
                                    P.O. Date: {this.state.invoice_main.date_of_po}<br />
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
                                <th style={{ textAlign: 'right' }}>Taxable Amount (Rs)</th>
                                <th style={{ textAlign: 'right' }}>CGST</th>
                                <th style={{ textAlign: 'right' }}>SGST</th>
                                <th style={{ textAlign: 'right' }}>IGST</th>
                                <th style={{ textAlign: 'right' }}>Total Amount (Rs.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {i}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="8" align="right">Round Off</td>
                                <td align="right">(-) {parseFloat(this.state.invoice_main.roff).toFixed(2)}</td>
                            </tr>
                            <tr >
                                <td colSpan="8" align="right"><b>Grand Total</b></td>
                                <td align="right"><b>{parseFloat(this.state.invoice_main.gtot).toFixed(2)}</b></td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="invoice-footer">
                    <table width="100%" className="table table-bordered">
                        <tbody>
                            <tr>
                                <td align="center" width="50%">
                                    <b>VIJAYA BANK &nbsp;IFSC: VIJB0008001 &nbsp;A/C. No.: 800100300003109<br />
                                        BRANCH: FANCY BAZAR, GUWAHATI-781001</b>
                                    <hr />
                                    <h4>EASY FINANCE AVAILABLE</h4>
                                    <div className="finance-grid">
                                        <div>
                                            <img alt="" src={require('./../../../assets/print-logo/bajaj.jpg')} />
                                        </div>
                                        <div>
                                            <img alt="" src={require('./../../../assets/print-logo/capital.jpg')} />
                                        </div>
                                        <div>
                                            <img alt="" src={require('./../../../assets/print-logo/hdb.jpg')} />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <b>Payment Details</b><br />Amount Paid: <b>{parseFloat(this.state.payment.amount_paid).toFixed(2)}</b>, Mode of Payment: <b>{j}</b>
                                    <hr/>
                                    <b>Remarks</b><br />
                                    {this.state.invoice_main.narration}
                                    </td>
                            </tr>
                        </tbody>
                    </table>

                    <table width="100%" className="table table-bordered">
                        <tbody>
                            <tr>
                                <td width="70%">
                                    <b>Terms &amp; Conditions<br /></b>
                                    <p>1. Manufacturers are responsible for all goods covered under guarantee / warranty period<br />
                                        2. Goods once sold cannot be taken back or exchanged<br />
                                        3. Receive the above goods in good condition.<br />
                                        4. ALL SUBJECT TO GUWAHATI JURISDICTION.</p>
                                </td>
                                <td width="30%" align="right">
                                    For <b>SANGANERIA AGENCIES</b><br /><br /><br /><br />Authorised Signatory
                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <img alt="" src={require('./../../../assets/print-logo/logo-line.jpg')} style={{ width: '100%' }} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>

                </div>
            </div>
        )
    }
}
