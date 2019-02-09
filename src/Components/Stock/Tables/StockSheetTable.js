import React, { Component } from 'react'

class StockSheetTable extends Component {
    render() {
        let data = this.props.data;
        let i = [];
        if (data.length > 0) {
            i = data.map((el, index) =>
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.brand_name}</td>
                    <td>{el.product_name}</td>
                    <td>{el.bar}</td>
                    <td>{el.model}</td>
                    <td style={{textAlign: 'right'}}>{el.qty}</td>
                    <td style={{textAlign: 'right'}}>{el.cost}</td>
                    <td style={{textAlign: 'right'}}>{el.tot}</td>
                    <td style={{textAlign: 'right'}}>{el.fre}</td>
                    <td style={{textAlign: 'right'}}>{el.gtot}</td>
                    <td style={{textAlign: 'right'}}>{el.bill}</td>
                    <td style={{ textAlign: 'right' }}>{el.bill_date}</td>
                    <td style={{textAlign: 'right'}}>{el.supplier_name}</td>
                </tr>
            )
        }
        return (
            <div>
                <table width="100%" className="table table-bordered table-stripped" id="table-to-xls">
                
                    <thead>
                        <tr>
                            <td colSpan="13" align="center"><h4>Stock Sheet</h4></td>
                        </tr>
                        <tr>
                            <td colSpan="13" align="center"><h4>Date from: {this.props.date_from} | Date to: {this.props.date_to}</h4></td>
                        </tr>
                        <tr className="alert-success">
                            <th>#</th>
                            <th>Brand Name</th>
                            <th>Product Name</th>
                            <th>Barcode</th>
                            <th>Model No</th>
                            <th style={{textAlign: 'right'}}>Qty</th>
                            <th style={{textAlign: 'right'}}>Cost</th>
                            <th style={{textAlign: 'right'}}>Total</th>
                            <th style={{textAlign: 'right'}}>Frieght</th>
                            <th style={{textAlign: 'right'}}>Grand Total</th>
                            <th style={{textAlign: 'right'}}>Purchase Bill No</th>
                            <th style={{ textAlign: 'right' }}>Purchase Bill Date</th>
                            <th style={{textAlign: 'right'}}>Supplier</th>
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

export default StockSheetTable;
