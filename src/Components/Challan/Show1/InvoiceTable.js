import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class InvoiceTable extends Component {
    onDelete(value, index) {
        this.props.delete(value, index);
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

    onModify = (el) => {
        
    }
    render() {
        let i = [];
        if (this.props.isLoading === false) {
            let data = this.props.data;
            console.log(data)
            i = data.map((el, index) =>
                <tr key={index}>
                    <td>{this.pad(el.challan_no)}</td>
                    <td>{el.date_of_invoice}</td>
                    <td>{el.customer_name}</td>
                    <td align="right">{parseFloat(el.bill_tot).toFixed(2)}</td>
                    <td align="right">{parseFloat(el.tax).toFixed(2)}</td>
                    <td align="right">{parseFloat(el.gtot).toFixed(2)}</td>
                    <td>{el.is_modified === '0' ? <Link to={`/challan/${el.challan_no}`}><i className="fa fa-file"> Modify</i></Link>: <i style={{color: 'green'}} className="fa fa-check"> Modified</i>}</td>
                    <td><Link to={`/printchallan/${this.props.type}/${el.challan_no}`}><i className="fa fa-print"></i></Link></td>
                    <td><Link to={`/challan/edit/${this.props.type}/${el.challan_no}`}><i className="fa fa-pencil"></i></Link></td>
                    <td><i className="fa fa-trash" onClick={this.onDelete.bind(this, el.challan_no, index)}></i></td>
                </tr>)
        }
        return (
            <div>
                <table width="100%" className="table table-bordered">
                    <thead>
                        <tr className="alert-success">
                            <th>Challan No</th>
                            <th>Challan Date</th>
                            <th>Customer Name</th>
                            <th style={{ textAlign: 'right' }}>Billed Amount</th>
                            <th style={{ textAlign: 'right' }}>Tax</th>
                            <th style={{ textAlign: 'right' }}>Grand Total</th>
                            <th></th>
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
