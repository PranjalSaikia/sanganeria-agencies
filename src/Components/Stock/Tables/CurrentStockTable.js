import React, { Component } from 'react'

class CurrentStockTable extends Component {
    render() {
        let data = this.props.data;
        let i = [];
        if (data.length > 0) {
            i = data.map((el, index) =>
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.brand_name}</td>
                    <td>{el.product_name}</td>
                    <td>{el.barcode}</td>
                    <td>{el.model}</td>
                    <td style={{textAlign: 'right'}}>{el.current_qty}</td>
                    <td style={{ textAlign: 'right' }}>{el.cost}</td>
                    <td style={{textAlign: 'right'}}>{el.mrp}</td>
                </tr>
            )
        }
        return (
            <div>
                <table width="100%" className="table table-bordered table-stripped" id="table-to-xls">
                
                    <thead>
                        <tr>
                            <td colSpan="8" align="center"><h4>Current Stock</h4></td>
                        </tr>
                        <tr className="alert-success">
                            <th>#</th>
                            <th>Brand Name</th>
                            <th>Product Name</th>
                            <th>Barcode</th>
                            <th>Model No</th>
                            <th style={{textAlign: 'right'}}>Qty</th>
                            <th style={{ textAlign: 'right' }}>Cost (per unit)</th>
                            <th style={{textAlign: 'right'}}>MRP (per unit)</th>
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

export default CurrentStockTable;
