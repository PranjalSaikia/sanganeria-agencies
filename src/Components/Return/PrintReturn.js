import React, { Component } from 'react';
import { PostData } from './../../api/service';

export default class PrintReturn extends Component {
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
        let id = this.props.id;

        const data = {
            id: id,

        }
        PostData('/api/fetch_return_single.php', data)
            .then((resp) => {
                console.log(resp);
                if (resp.status === '200') {
                    this.setState({
                        invoice_det: resp.data[0].table_data,
                        invoice_main: resp.data[0],
                        isLoading: false
                    })
                }
            })
    }



    render() {
        let i = [];
        if (this.state.isLoading === false) {
            let invoice_det = this.state.invoice_det;
            i = invoice_det.map((el, index) =>
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.barcode}</td>
                    <td>{el.brand_name}</td>
                    <td>{el.product_name}</td>
                    <td>{el.hsn}</td>
                    <td align="right">{el.qty} <br/>({el.imei})</td>
                    <td align="right">{parseFloat(el.mrp).toFixed(2)}</td>
                    <td align="right">{parseFloat(el.cost).toFixed(2)}</td>
                    <td align="right">{parseFloat(el.gtot).toFixed(2)}</td>
                </tr>
            )
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
                                    <img src={require('./../../assets/print-logo/print-logo.jpg')} alt="" className="invoice-logo" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td >
                                    <h4><b>Sl No. {this.state.invoice_main.id}</b></h4>
                                </td>
                                <td >
                                    <h4><b>Against. {this.state.invoice_main.against_bill_no}</b></h4>
                                </td>
                                <td >
                                    <h4><b>Entry Date. {this.state.invoice_main.entry_date}</b></h4>
                                </td>
                                <td >
                                    <h4><b>Puchase Bill No. {this.state.invoice_main.purchase_bill}</b></h4>
                                </td>
                                <td >
                                    <h4><b>Puchase Bill Date. {this.state.invoice_main.purchase_bill_date}</b></h4>
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
                                        <b>{this.state.invoice_main.supplier_name}</b><br />
                                        {this.state.invoice_main.supplier_address}<br />
                                        {this.state.invoice_main.supplier_contact}<br />
                                        GSTIN: {this.state.invoice_main.supplier_gstin}<br />
                                        STATE: {this.state.invoice_main.supplier_state}

                                    </header>
                                </td>
                                <td valign="top" width="33%">
                                    From,<br />
                                    <b>Sanganeria Agencies</b><br />
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
                                <th>Barcode</th>
                                <th>Brand Name</th>
                                <th>Product Name</th>
                                <th>HSN</th>
                                <th style={{ textAlign: 'right' }}>Qty(Pcs)</th>
                                <th style={{ textAlign: 'right' }}>MRP(Rs.)</th>
                                <th style={{ textAlign: 'right' }}>Cost (Rs)</th>
                                <th style={{ textAlign: 'right' }}>Total Amount (Rs.)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {i}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="8" align="right">Bill Total</td>
                                <td align="right">{parseFloat(this.state.invoice_main.bill_total).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="8" align="right">GST (CGST@{this.state.invoice_main.cgst}% &nbsp;&nbsp;  SGST@{this.state.invoice_main.sgst}% &nbsp;&nbsp; IGST@{this.state.invoice_main.igst}%)</td>
                                <td align="right">{parseFloat(this.state.invoice_main.tax).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="8" align="right">Round Off</td>
                                <td align="right">{parseFloat(this.state.invoice_main.roff).toFixed(2)}</td>
                            </tr>
                            <tr >
                                <td colSpan="8" align="right"><b>Grand Total</b></td>
                                <td align="right"><b>{parseFloat(this.state.invoice_main.gtot).toFixed(2)}</b></td>
                            </tr>
                        </tfoot>
                    </table>





                </div>
            </div>
        )
    }
}
