import React, { Component } from 'react'
import InsertSupplier from './InsertSupplier';
import EditSupplier from './EditSupplier';
import SupplierTable from './SupplierTable';
import { GetData, PostData } from './../../../api/service';
import Notifications, { notify } from 'react-notify-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class SupplierInsert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suppliers: [],
            edit: [],
            edit_pannel: false,
            isLoading: true
        }

        this.insertData = this.insertData.bind(this);
    }

    _initialFetch() {
        GetData('/api/fetch_supplier.php')
            .then((data) => {
                if(data.status === '200'){
                    this.setState({
                        suppliers: data.data,
                        isLoading: false
                    })
                }
            });
    }

    componentDidMount() {
        this._initialFetch();
    }

    insertData(data) {
        PostData('/api/insert_supplier.php', data)
            .then((resp) => {
                if (resp.status === '200') {
                    notify.show(resp.data, 'success', 3000);
                    this._initialFetch();
                } else {
                    notify.show('Something Went Wrong!', 'error', 3000);
                }

            });
    }

    onDeleteConfirm(supplier_id) {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: this.deleteData.bind(this, supplier_id)
                },
                {
                    label: 'No',
                }
            ]
        })
    }


    deleteData(supplier_id) {
        const data = {
            supplier_id: supplier_id,
            type: 'delete'
        }

        PostData('/api/update_supplier.php', data)
            .then((resp) => {
                //console.log(resp);
                if (resp.status === '200') {
                    notify.show(resp.data, 'success', 3000);
                    this._initialFetch();
                } else {
                    notify.show('Something Went Wrong!', 'error', 3000);
                }
            })
    }

    onEditPress(supplier_id) {
        let suppliers = this.state.suppliers;
        let results = suppliers.filter((el) => el.supplier_id === supplier_id);
        this.setState({
            edit: results,
            edit_pannel: true
        })
    }

    updateData(data) {
        PostData('/api/update_supplier.php', data)
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
                <h2>Suppliers</h2>
                <hr />
                <div className="col-md-3">
                    {!this.state.edit_pannel ? <InsertSupplier setData={this.insertData} /> : <EditSupplier setEditData={this.state.edit} updateData={this.updateData.bind(this)} />}

                </div>

                <div className="col-md-9" style={{ backgroundColor: '#f9f9f9' }}>
                    <SupplierTable isLoading={this.state.isLoading} customers={this.state.suppliers} onDeleteConfirm={this.onDeleteConfirm.bind(this)} onEditPress={this.onEditPress.bind(this)} />
                </div>
            </div>
        )
    }
}

export default SupplierInsert;