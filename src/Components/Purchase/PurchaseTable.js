import React, { Component } from 'react'
import TablePurchase from './Comp/TablePurchase';
import { GetData, PostData } from '../../api/service';
import { confirmAlert } from 'react-confirm-alert';
import Notifications, { notify } from 'react-notify-toast';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class PurchaseTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: []
        }
    }

    _initialFetch(){
        GetData('/api/fetch_purchase.php')
            .then((resp) => {
                if (resp.status === '200') {
                    this.setState({
                        results: resp.data
                    })
                }
            })
    }

    componentDidMount() {
        this._initialFetch();
    }

    onDelete(id) {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: this.deleteData.bind(this, id)
                },
                {
                    label: 'No',
                }
            ]
        })
    }

    deleteData(id){
        //console.log(id);
        const data = {
            id: id
        }
        PostData('/api/delete_purchase.php',data)
        .then((resp) => {
            if(resp.status === '200'){
                this._initialFetch();
            }
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <h3>Purchase Table</h3>
                <hr />
                <TablePurchase data={this.state.results} onDelete={this.onDelete.bind(this)} />
            </div>
        )
    }
}
