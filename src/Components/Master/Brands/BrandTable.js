import React, { Component } from 'react';


class BrandTable extends Component {
    constructor(props) {
        super(props);
        
    }

    editData(brand_id){
        this.props.onEditPress(brand_id);
    }

    deleteData(brand_id) {
        this.props.onDeleteConfirm(brand_id);
    }

    
  render() {
      let brands = this.props.brands;
      let i = [];
      if(brands.length > 0){
        brands.map((el,index) =>
            i.push(<tr key={index}>
                <td>{index + 1}</td>
                <td>{el.brand_name}</td>
                <td><a onClick={this.editData.bind(this, el.brand_id)}><i className="fa fa-pencil"></i></a></td>
                <td><a onClick={this.deleteData.bind(this,el.brand_id)}><i className="fa fa-trash"></i></a></td>
            </tr>)
        )
      } else {
          i = <tr key="0" ><td colSpan="4" align="center">No data found</td></tr>;
      }
    return (
      <div style={{padding: '10px'}}>
      <h3>Brand Table</h3>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Brand Name</th>
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
export default BrandTable;