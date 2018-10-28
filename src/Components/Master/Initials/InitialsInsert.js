import React, { Component } from 'react'
import InsertBrand from './InsertInitials';
import EditBrand from './EditInitials';
import BrandTable from './InitialsTable';
import { GetData, PostData } from './../../../api/service';
import Notifications, { notify } from 'react-notify-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class InitialsInsert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initials: [],
            edit: [],
            edit_pannel: false,
            isLoading: true
        }

        this.insertData = this.insertData.bind(this);
    }

    _initialFetch() {
        GetData('/api/fetch_initials.php')
            .then((data) => {
                if (data.status === '200') {
                    this.setState({
                        initials: data.data,
                        isLoading: false
                    })
                }

            });
    }

    componentDidMount() {
        this._initialFetch();
    }

    insertData(data) {
        PostData('/api/insert_initials.php', data)
            .then((resp) => {
                if (resp.status === '200') {
                    notify.show(resp.data, 'success', 3000);
                    this._initialFetch();
                } else {
                    notify.show('Something Went Wrong!', 'error', 3000);
                }

            });
    }

    onDeleteConfirm(unit_id) {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: this.deleteData.bind(this, unit_id)
                },
                {
                    label: 'No',
                }
            ]
        })
    }


    deleteData(unit_id) {
        const data = {
            id: unit_id,
            type: 'delete'
        }

        PostData('/api/update_initials.php', data)
            .then((resp) => {
                if (resp.status === '200') {
                    notify.show(resp.data, 'success', 3000);
                    this._initialFetch();
                } else {
                    notify.show('Something Went Wrong!', 'error', 3000);
                }
            })
    }

    onEditPress(unit_id) {
        let units = this.state.initials;
        let results = units.filter((el) => el.id === unit_id);
        this.setState({
            edit: results,
            edit_pannel: true
        })
    }

    updateData(data) {
        PostData('/api/update_initials.php', data)
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
                <h2>Initials</h2>
                <hr />
                <div className="col-md-6">
                    {!this.state.edit_pannel ? <InsertBrand setData={this.insertData} /> : <EditBrand setEditData={this.state.edit} updateData={this.updateData.bind(this)} />}

                </div>

                <div className="col-md-6" style={{ backgroundColor: '#f9f9f9' }}>
                    <BrandTable units={this.state.initials} onDeleteConfirm={this.onDeleteConfirm.bind(this)} onEditPress={this.onEditPress.bind(this)} />
                </div>
            </div>
        )
    }
}

export default InitialsInsert;