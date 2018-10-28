import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import { confirmAlert } from 'react-confirm-alert';
import { PostData, GetData } from './../../api/service';
import 'react-confirm-alert/src/react-confirm-alert.css';
import PurchaseDetEdit from './Comp/PurchaseDetEdit';

export default class ReturnEdit extends Component {
    constructor(props) {
        super(props);



        this.state = {
            suppliers: [],
            brands: [],
            products: [],
            isLoading: true,
            f_data: []
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

        const data1 = {
            id: this.props.match.params.id
        }
        PostData('/api/fetch_return_single.php', data1)
            .then((resp) => {
                if (resp.status === '200') {
                    this.setState({
                        f_data: resp.data,
                        isLoading: false
                    })
                }
            })
    }

    componentDidMount() {

        this._initialFetch();
    }



    render() {
        if (!this.state.isLoading) {
            return (
                <div className="container-fluid">
                    <Notifications />
                    <h3>Return Edit</h3>
                    <PurchaseDetEdit history={this.props.history} brands={this.state.brands} data={this.state.f_data} products={this.state.products} suppliers={this.state.suppliers} />
                </div>
            )
        } else {
            return null;
        }

    }
}
