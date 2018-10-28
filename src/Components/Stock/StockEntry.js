import React, { Component } from 'react';
import { PostData, GetData } from './../../api/service';
import StockTable from './StockTable';
import EntryForm from './EntryForm';
import EntryEdit from './EntryEdit';
import Notifications, { notify } from 'react-notify-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class StockEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            suppliers: [],
            brands: [],
            table_data: [],
            status: true,
            edit: []
        }

        
    }

    _initialFetch() {
        GetData('/api/fetch_brand.php')
            .then((data) => {
                if (data.status === '200') {
                    this.setState({
                        brands: data.data,
                    })
                }
            });


        GetData('/api/fetch_products.php')
            .then((data) => {
                if (data.status === '200') {
                    this.setState({
                        products: data.data,
                    })
                }
            });


        GetData('/api/fetch_supplier.php')
            .then((data) => {
                if (data.status === '200') {
                    this.setState({
                        suppliers: data.data,
                    })
                }
            });
    }

   

    componentDidMount() {
        this._initialFetch();
        this._initialFetchStock();
    }

    



    //insert data 
    setData(data) {
        PostData('/api/stock_entry.php', data)
            .then((resp) => {
                //console.log(resp)
                if (resp.status === '200') {
                    
                    notify.show(resp.data, 'success', 3000);
                    this._initialFetchStock();
                } else {
                    notify.show('Something Went Wrong!', 'error', 3000);
                }

            });
    }


    //fetch stock entry table

    _initialFetchStock() {
        GetData('/api/fetch_stock_entry.php')
            .then((resp) => {
                if (resp.status === '200') {
                    this.setState({
                        table_data: resp.data
                    })
                }

            });
    }



    //delete data 

    onDeleteConfirm(id,barcode) {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: this.deleteData.bind(this, id, barcode)
                },
                {
                    label: 'No',
                }
            ]
        })
    }


    deleteData(id,barcode) {
        const data = {
            id: id,
            barcode: barcode,
            type: 'delete'
        }

        PostData('/api/update_stock_entry.php', data)
            .then((resp) => {
                if (resp.status === '200') {
                    notify.show(resp.data, 'success', 3000);
                    this._initialFetchStock();
                } else {
                    notify.show('Something Went Wrong!', 'error', 3000);
                }
            })
    }



    //edit data

    onEditPress(id) {
        let table_data = this.state.table_data;
        let results = table_data.filter((el) => el.id === id);
        this.setState({
            edit: results,
            status: false
        })
        window.scrollTo(0, 0);
    }

    updateData(data) {
        
        PostData('/api/update_stock_entry.php', data)
            .then((resp) => {
                if (resp.status === '200') {
                    notify.show(resp.data, 'success', 3000);
                    this._initialFetchStock();
                } else {
                    notify.show('Something Went Wrong!', 'error', 3000);
                }
                this.setState({
                    status: true
                })
            })
    }


    render() {
        
        return (
            <div className="container-fluid">
                <Notifications />
                <h1>Stock Entry</h1>

                <hr />

                {this.state.status ? <EntryForm setData={this.setData.bind(this)} products={this.state.products} brands={this.state.brands} suppliers={this.state.suppliers} /> : <EntryEdit products={this.state.products} brands={this.state.brands} setEditData={this.state.edit} updateData={this.updateData.bind(this)} suppliers={this.state.suppliers} />}
                <hr />

                <StockTable data={this.state.table_data} onDeleteConfirm={this.onDeleteConfirm.bind(this)} onEditPress={this.onEditPress.bind(this)} />

            </div>
        )
    }
}
