import React, { Component } from 'react';


class ProductTable extends Component {
    constructor(props) {
        super(props);

    }

    editData(barcode) {
        this.props.onEditPress(barcode);
    }

    deleteData(barcode) {
        this.props.onDeleteConfirm(barcode);
    }


    render() {
        let products = this.props.products;
        let i = [];
        let str = "";
        if (products.length > 0) {
            products.map((el, index) =>{

                if(el.gst === '0'){
                    str = "No";
                }else{
                    str = "YES";
                }
                return i.push(<tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.brand_name}</td>
                    <td>{el.product_name}</td>
                    <td>{el.product_desc}</td>
                    <td>{el.model}</td>
                    <td>{el.unit}</td>
                    <td>{str}</td>
                    <td>{el.hsn}</td>
                    <td style={{ textAlign: 'right' }}>{el.igst}</td>
                    <td style={{ textAlign: 'right' }}>{el.cgst}</td>
                    <td style={{ textAlign: 'right' }}>{el.sgst}</td>
                    <td>{el.barcode}</td>
                    <td><a onClick={this.editData.bind(this, el.barcode)}><i className="fa fa-pencil"></i></a></td>
                    <td><a onClick={this.deleteData.bind(this, el.barcode)}><i className="fa fa-trash"></i></a></td>
                </tr>)
            }
                
            )
        } else {
            i = <tr key="0" ><td colSpan="13" align="center">No data found</td></tr>;
        }
        return (
            <div style={{ padding: '10px' }}>
                <h3>Product Table</h3>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Brand Name</th>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Model</th>
                            <th>Unit</th>
                            <th>GST Applicable</th>
                            <th>HSN/SAC</th>
                            <th style={{ textAlign: 'right' }}>IGST(%)</th>
                            <th style={{ textAlign: 'right' }}>CGST(%)</th>
                            <th style={{textAlign: 'right'}}>SGST(%)</th>
                            <th>Barcode</th>
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
export default ProductTable;