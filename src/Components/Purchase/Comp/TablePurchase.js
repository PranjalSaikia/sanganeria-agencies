import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class TablePurchase extends Component {
    onDelete(id){
        this.props.onDelete(id);
    }
    render() {
        let i = [];
        let data = this.props.data;
        if (data.length > 0) {
            i = data.map((el, index) =>
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.entry_date}</td>
                    <td>{el.purchase_bill}</td>
                    <td>{el.purchase_bill_date}</td>
                    <td>{el.supplier_name}</td>
                    <td align="right">{el.bill_total}</td>
                    <td align="right">{el.tax}</td>
                    <td align="right">{el.gtot}</td>
                    <td align="center"><Link to={`/stock/print/${el.id}`} ><i className="fa fa-file"></i></Link></td>
                    <td align="center"><Link to={`/stock/edit/${el.id}`} ><i className="fa fa-pencil"></i></Link></td>
                    <td align="center"><a onClick={this.onDelete.bind(this,el.id)} ><i className="fa fa-trash"></i></a></td>
                </tr>)
        } else {
            i = <tr key="0">
                <td colSpan="11" align="center">
                    No data found
                </td>
            </tr>
        }
        return (
            <div>
                <table width="100%" className="table table-bordered">
                    <thead>

                        <tr className="alert-success">
                            <th>#</th>
                            <th>Date of Entry</th>
                            <th>Purchase bill No</th>
                            <th>Purchase Bill Date</th>
                            <th>Supplier Name</th>
                            <th style={{textAlign: 'right'}}>Bill total</th>
                            <th style={{textAlign: 'right'}}>Tax</th>
                            <th style={{textAlign: 'right'}}>Grand total</th>
                            <th>View</th>
                            <th>Edit</th>
                            <th>Delete</th>
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
