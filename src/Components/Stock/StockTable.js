import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class StockTable extends Component {
    editData(id) {
        this.props.onEditPress(id);
    }

    deleteData(id,barcode) {
        this.props.onDeleteConfirm(id,barcode);
    }

    onClick(cell,row){
        console.log(row)
    }

    buttonFormatter = (cell, row) => {
        if (row.po_no === '') {
            return (<a onClick={this.editData.bind(this, row.id)}><i className="fa fa-pencil"></i></a>)
        }
    }

    buttonFormatter1 = (cell, row) => {
        if(row.po_no === ''){
            return (<a onClick={this.deleteData.bind(this, row.id, row.barcode)}><i className="fa fa-trash"></i></a>)
        }
        
    }

    rowId = (cell,row, enumObject, rowIndex) => {
        return (<div>{rowIndex+1}</div>);
    }
  render() {
      let data = this.props.data;
      
    return (
      <div>
            <h3>Stock Sheet</h3>
            <div className="table-responsive" >
                 <BootstrapTable data={this.props.data} striped hover pagination search condensed>
                    <TableHeaderColumn isKey dataField='any' dataFormat={this.rowId}>#</TableHeaderColumn>
                    <TableHeaderColumn dataField='date1'>Date of entry</TableHeaderColumn>
                    <TableHeaderColumn dataField='barcode'>Product Code</TableHeaderColumn>
                    <TableHeaderColumn dataField='product_name'>Product Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='brand_name'>Product Brand</TableHeaderColumn>
                    <TableHeaderColumn dataField='model'>Model</TableHeaderColumn>
                    <TableHeaderColumn dataField='qty'>Qty Received</TableHeaderColumn>
                    <TableHeaderColumn dataField='cost'>Cost Price (per unit)</TableHeaderColumn>
                    <TableHeaderColumn dataField='tot'>Total Cost</TableHeaderColumn>
                    <TableHeaderColumn dataField='fre'>Freight</TableHeaderColumn>
                    <TableHeaderColumn dataField='gtot'>Grand Total</TableHeaderColumn>
                    <TableHeaderColumn dataField='supplier_name'>Supplier</TableHeaderColumn>
                    <TableHeaderColumn dataField="button" dataFormat={this.buttonFormatter}>Edit</TableHeaderColumn>
                    <TableHeaderColumn dataField="button" dataFormat={this.buttonFormatter1}>Delete</TableHeaderColumn>
                </BootstrapTable> 
            </div>
      </div>
    )
  }
}

export default StockTable;