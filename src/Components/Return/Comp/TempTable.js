import React, { Component } from 'react'

export default class TempTable extends Component {

    handleDelete(index) {
        this.props.onDelete(index);
    }
    render() {
        let data = this.props.data;
        let i = [];
        if (data.length > 0) {
            i = data.map((el, index) =>
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.brand_name}</td>
                    <td>{el.product_name}</td>
                    <td align="right">{el.qty}</td>
                    <td align="right">{el.cost}</td>
                    <td align="right">{el.mrp}</td>
                    <td align="right">{el.total}</td>
                    <td><a onClick={this.handleDelete.bind(this, el.index)}><i className="fa fa-trash"></i></a></td>
                </tr>
            )
        } else {
            i = <tr key="0">
                <td colSpan="8" align="center">No Data</td>
            </tr>
        }
        return (
            <div>
                <table width="100%" className="table table-bordered">
                    <thead>
                        <tr className="alert-success">
                            <th>#</th>
                            <th>Brand</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Cost</th>
                            <th>MRP</th>
                            <th>Total</th>
                            <th>&nbsp;</th>
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
