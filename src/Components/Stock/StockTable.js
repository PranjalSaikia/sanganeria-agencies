import React, { Component } from 'react'

class StockTable extends Component {
    editData(id) {
        this.props.onEditPress(id);
    }

    deleteData(id,barcode) {
        this.props.onDeleteConfirm(id,barcode);
    }
  render() {
      let data = this.props.data;
      let i = [];
      if(data.length > 0 ){
        i = data.map((el,index) => 
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{el.date1}</td>
                <td>{el.barcode}</td>
                <td>{el.product_name}</td>
                <td>{el.brand_name}</td>
                <td style={{textAlign: 'right'}}>{el.qty}</td>
                <td style={{textAlign: 'right'}}>{el.cost}</td>
                <td style={{textAlign: 'right'}}>{el.tot}</td>
                <td style={{textAlign: 'right'}}>{el.fre}</td>
                <td style={{textAlign: 'right'}}>{el.gtot}</td>
                <td style={{textAlign: 'right'}}>{el.supplier_name}</td>
                <td><a onClick={this.editData.bind(this, el.id)}><i className="fa fa-pencil"></i></a></td>
                <td><a onClick={this.deleteData.bind(this, el.id, el.barcode)}><i className="fa fa-trash"></i></a></td>
            </tr>
        )
      }
    return (
      <div>
            <h3>Stock Sheet</h3>
            <div className="table-responsive" >
                <table width="100%" className="table table-bordered" style={{ fontSize: '0.8em !important' }}>
                    <thead>
                        <tr className="alert-success">
                            <th>#</th>
                            <th>Date of Entry</th>
                            <th>Product Code</th>
                            <th>Product Name</th>
                            <th>Product Brand</th>
                            <th style={{textAlign: 'right'}}>Qty Received</th>
                            <th style={{textAlign: 'right'}}>Cost Price (per unit)</th>
                            <th style={{textAlign: 'right'}}>Total Cost</th>
                            <th style={{textAlign: 'right'}}>Freight</th>
                            <th style={{textAlign: 'right'}}>Grand Total</th>
                            <th style={{textAlign: 'right'}}>Supplier</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {i}
                    </tbody>
                </table>
            </div>
      </div>
    )
  }
}

export default StockTable;