import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ReturnTable extends Component {
    onDelete(value, type, index) {
        this.props.delete(value, type, index);
    }
    render() {
        let i = [];
        if (this.props.isLoading === false) {
            let data = this.props.data;
            i = data.map((el, index) =>
                <tr key={index}>
                    <td>{el.inv_no}</td>
                    <td>{el.date_of_invoice}</td>
                    <td>{el.customer_name}</td>
                    <td align="right">{parseFloat(el.bill_tot).toFixed(2)}</td>
                    <td align="right">{parseFloat(el.tax).toFixed(2)}</td>
                    <td align="right">{parseFloat(el.gtot).toFixed(2)}</td>
                    <td><Link to={`/printinvoicer/${el.type}/${el.inv_no}`}><i className="fa fa-print"></i></Link></td>
                    <td><Link to={`/invoice/editr/${el.type}/${el.inv_no}`}><i className="fa fa-pencil"></i></Link></td>
                    <td><i className="fa fa-trash" onClick={this.onDelete.bind(this, el.inv_no,el.type, index)}></i></td>
                </tr>)
        }
        return (
            <div>
                <table width="100%" className="table table-bordered">
                    <thead>
                        <tr className="alert-success">
                            <th>Invoice No</th>
                            <th>Invoice Date</th>
                            <th>Customer Name</th>
                            <th style={{ textAlign: 'right' }}>Billed Amount</th>
                            <th style={{ textAlign: 'right' }}>Tax</th>
                            <th style={{ textAlign: 'right' }}>Grand Total</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {i}
                    </tbody>
                </table>
            </div>
        )
    }
}
