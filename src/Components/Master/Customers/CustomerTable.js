import React, { Component } from 'react';


class CustomerTable extends Component {
    constructor(props) {
        super(props);

    }

    editData(customer_id) {
        this.props.onEditPress(customer_id);
    }

    deleteData(customer_id) {
        this.props.onDeleteConfirm(customer_id);
    }


    render() {
        let customers = this.props.customers;
        let i = [];
        if (this.props.isLoading === false) {
            if(customers.length > 0){
                i = customers.map((el, index) =>
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{el.customer_name}</td>
                        <td>{el.customer_address}</td>
                        <td>{el.customer_contact}</td>
                        <td>{el.customer_email}</td>
                        <td>{el.customer_gstin}</td>
                        <td>{el.customer_state}</td>
                        <td><a onClick={this.editData.bind(this, el.customer_id)}><i className="fa fa-pencil"></i></a></td>
                        <td><a onClick={this.deleteData.bind(this, el.customer_id)}><i className="fa fa-trash"></i></a></td>
                    </tr>
                )
            }
        }else{
            i = <tr key="0" ><td colSpan="8" align="center">No data found</td></tr>;
        }
        return (
            <div style={{ padding: '10px' }}>
                <h3>Customer Table</h3>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer Name</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Customer GSTIN</th>
                            <th>Customer State</th>
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
export default CustomerTable;