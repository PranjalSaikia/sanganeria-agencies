import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class InvoiceTable extends Component {
    onDelete(value,type,index){
        this.props.delete(value, type, index);
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

    getType(value){
        if(parseInt(value) === 0){
            return 'B2C/';
        } else if (parseInt(value) === 1){
            return 'B2B/';
        }
    }
    render() {
        let i = [];
        if (this.props.isLoading === false) {
            let data = this.props.data;
            
            i = data.map((el, index) =>
                <tr key={index}>
                    <td>{this.getType(el.type)}{this.pad(el.inv_no)}</td>
                    <td>{el.date_of_invoice}</td>
                    <td>{el.customer_name}</td>
                    <td align="right">{parseFloat(el.bill_tot).toFixed(2)}</td>
                    <td align="right">{parseFloat(el.tax).toFixed(2)}</td>
                    <td align="right">{parseFloat(el.gtot).toFixed(2)}</td>
                    <td align="right">{el.narration}</td>
                    <td><Link to={`/printinvoice/${el.type}/${el.inv_no}`}><i className="fa fa-print"></i></Link></td>
                    <td><Link to={`/invoice/edit/${el.type}/${el.inv_no}`}><i className="fa fa-pencil"></i></Link></td>
                    <td><i className="fa fa-trash" onClick={this.onDelete.bind(this, el.inv_no,el.type, index)}></i></td>
                </tr>)
        }
        return (
            <div>
                <table width="100%" className="table table-bordered" id="table-to-xls">
                    <thead>
                        <tr className="alert-success">
                            <th>Invoice No</th>
                            <th>Invoice Date</th>
                            <th>Customer Name</th>
                            <th style={{textAlign: 'right'}}>Billed Amount</th>
                            <th style={{textAlign: 'right'}}>Tax</th>
                            <th style={{ textAlign: 'right' }}>Grand Total</th>
                            <th style={{textAlign: 'right'}}>Remarks</th>
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
