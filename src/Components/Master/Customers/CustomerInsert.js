import React, { Component } from 'react'
import InsertCustomer from './InsertCustomer';
import EditCustomer from './EditCustomer';
import CustomerTable from './CustomerTable';
import { GetData, PostData } from './../../../api/service';
import Notifications, { notify } from 'react-notify-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class CustomerInsert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            edit: [],
            edit_pannel: false,
            isLoading: true
        }

        this.insertData = this.insertData.bind(this);
    }

    _initialFetch() {
        GetData('/api/fetch_customer.php')
            .then((data) => {
                if(data.status === '200'){
                    this.setState({
                        customers: data.data,
                        isLoading: false
                    })
                }
            });
    }

    componentDidMount() {
        this._initialFetch();
    }

    insertData(data) {
        PostData('/api/insert_customer.php', data)
            .then((resp) => {
                if (resp.status === '200') {
                    notify.show(resp.data, 'success', 3000);
                    this._initialFetch();
                } else {
                    notify.show('Something Went Wrong!', 'error', 3000);
                }

            });
    }

    onDeleteConfirm(customer_id) {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: this.deleteData.bind(this, customer_id)
                },
                {
                    label: 'No',
                }
            ]
        })
    }


    deleteData(customer_id) {
        const data = {
            customer_id: customer_id,
            type: 'delete'
        }

        PostData('/api/update_customer.php', data)
            .then((resp) => {
                console.log(resp);
                if (resp.status === '200') {
                    notify.show(resp.data, 'success', 3000);
                    this._initialFetch();
                } else {
                    notify.show('Something Went Wrong!', 'error', 3000);
                }
            })
    }

    onEditPress(customer_id) {
        let customers = this.state.customers;
        let results = customers.filter((el) => el.customer_id === customer_id);
        this.setState({
            edit: results,
            edit_pannel: true
        })
    }

    updateData(data) {
        PostData('/api/update_customer.php', data)
            .then((resp) => {
                if (resp.status === '200') {
                    notify.show(resp.data, 'success', 3000);
                    this._initialFetch();
                } else {
                    notify.show('Something Went Wrong!', 'error', 3000);
                }
                this.setState({
                    edit_pannel: false
                })
            })
    }



    render() {
        return (
            <div>
                <Notifications />
                <h2>Customers</h2>
                <hr />
                <div className="col-md-3">
                    {!this.state.edit_pannel ? <InsertCustomer setData={this.insertData} /> : <EditCustomer setEditData={this.state.edit} updateData={this.updateData.bind(this)} />}

                </div>

                <div className="col-md-9" style={{ backgroundColor: '#f9f9f9' }}>
                    <CustomerTable isLoading={this.state.isLoading} customers={this.state.customers} onDeleteConfirm={this.onDeleteConfirm.bind(this)} onEditPress={this.onEditPress.bind(this)} />
                </div>
            </div>
        )
    }
}

export default CustomerInsert;