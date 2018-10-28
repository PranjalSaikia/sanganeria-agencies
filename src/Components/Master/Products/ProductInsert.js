import React, { Component } from 'react'
import InsertProduct from './InsertProduct';
import EditProduct from './EditProduct';
import ProductTable from './ProductTable';
import { GetData, PostData } from './../../../api/service';
import Notifications, { notify } from 'react-notify-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class ProductInsert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            units: [],
            edit: [],
            edit_pannel: false,
            isLoading: true,
            brands: [],
            initials: []
        }

        this.insertData = this.insertData.bind(this);
    }

    _brandFetch() {
        GetData('/api/fetch_brand.php')
            .then((data) => {
                if(data.status === '200'){
                    this.setState({
                        brands: data.data,
                        isLoading: false
                    })
                }
            });

        GetData('/api/fetch_unit.php')
            .then((data) => {
                if (data.status === '200') {
                    this.setState({
                        units: data.data,
                        isLoading: false
                    })
                }
            });

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

    _initialFetch() {
        GetData('/api/fetch_products.php')
            .then((data) => {
                if(data.status === '200'){
                    this.setState({
                        products: data.data,
                        isLoading: false
                    })
                }
            });
    }

    componentDidMount() {
        this._initialFetch();
        this._brandFetch();
    }

    insertData(data) {
        PostData('/api/insert_product.php', data)
            .then((resp) => {
                if (resp.status === '200') {
                    notify.show(resp.data, 'success', 3000);
                    this._initialFetch();
                } else {
                    notify.show('Something Went Wrong!', 'error', 3000);
                }

            });
    }

    onDeleteConfirm(barcode) {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: this.deleteData.bind(this, barcode)
                },
                {
                    label: 'No',
                }
            ]
        })
    }


    deleteData(barcode) {
        const data = {
            barcode: barcode,
            type: 'delete'
        }

        PostData('/api/update_product.php', data)
            .then((resp) => {
                if (resp.status === '200') {
                    notify.show(resp.data, 'success', 3000);
                    this._initialFetch();
                } else {
                    notify.show('Something Went Wrong!', 'error', 3000);
                }
            })
    }

    onEditPress(barcode) {
        let products = this.state.products;
        let results = products.filter((el) => el.barcode === barcode);
        this.setState({
            edit: results,
            edit_pannel: true
        })
        window.scrollTo(0,0);
    }

    updateData(data) {
        PostData('/api/update_product.php', data)
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
                <h2>Products</h2>
                <hr />
                <div className="col-md-12">
                    {!this.state.edit_pannel ? <InsertProduct setData={this.insertData} brands={this.state.brands} units={this.state.units} initials={this.state.initials} /> : <EditProduct setEditData={this.state.edit} updateData={this.updateData.bind(this)} brands={this.state.brands} units={this.state.units} initials={this.state.initials} />}

                </div>

                <div className="col-md-12" style={{ backgroundColor: '#f9f9f9' }}>
                    <ProductTable products={this.state.products} onDeleteConfirm={this.onDeleteConfirm.bind(this)} onEditPress={this.onEditPress.bind(this)} />
                </div>
            </div>
        )
    }
}

export default ProductInsert;