import React, { Component } from 'react';


class SupplierTable extends Component {
    constructor(props) {
        super(props);

    }

    editData(supplier_id) {
        this.props.onEditPress(supplier_id);
    }

    deleteData(supplier_id) {
        this.props.onDeleteConfirm(supplier_id);
    }


    render() {
        let customers = this.props.customers;
        let i = [];
        if (this.props.isLoading === false) {
            if (customers.length > 0) {
                i = customers.map((el, index) =>
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{el.supplier_name}</td>
                        <td>{el.supplier_address}</td>
                        <td>{el.supplier_contact}</td>
                        <td>{el.supplier_email}</td>
                        <td>{el.supplier_gstin}</td>
                        <td>{el.supplier_state}</td>
                        <td><a onClick={this.editData.bind(this, el.supplier_id)}><i className="fa fa-pencil"></i></a></td>
                        <td><a onClick={this.deleteData.bind(this, el.supplier_id)}><i className="fa fa-trash"></i></a></td>
                    </tr>
                )
            }
        } else {
            i = <tr key="0" ><td colSpan="8" align="center">No data found</td></tr>;
        }
        return (
            <div style={{ padding: '10px' }}>
                <h3>Supplier Table</h3>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Supplier Name</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>GSTIN</th>
                            <th>State</th>
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
export default SupplierTable;