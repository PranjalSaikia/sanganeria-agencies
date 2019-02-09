import React, { Component } from 'react'

export default class TempView extends Component {
    render() {
    let data = this.props.data;
    let i = [];
    if(data.length > 0){
        i = data.map((el,index) => 
            <ul className='list-unstyled' key={index}>
                <li style={{ paddingTop: '10px' }}><b>Barcode</b>: {el.barcode}</li>
                <li style={{ paddingTop: '10px' }}><b>Brand Name</b>: {el.brand_name}</li>
                <li style={{ paddingTop: '10px' }}><b>Product Name</b>: {el.product_name}</li>
                <li style={{ paddingTop: '10px' }}><b>MRP</b>: {el.mrp}</li>
                <li style={{ paddingTop: '10px' }}><b>CGST</b>: {el.cgst}</li>
                <li style={{ paddingTop: '10px' }}><b>SGST</b>: {el.sgst}</li>
                <li style={{ paddingTop: '10px' }}><b>IGST</b>: {el.igst}</li>
                <li style={{ paddingTop: '10px' }}><b>Current Stock</b>: {el.qty}</li>
                <li style={{ paddingTop: '10px' }}><b>Cost Price</b>: {el.cost}</li>
            </ul>
        )
    }
        return (
            <div className="bglight">
                <h4 align="center">PRODUCT INFO</h4>
                {i}
            </div>
        )
    }
}
