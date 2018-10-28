import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import { confirmAlert } from 'react-confirm-alert';
import { PostData, GetData } from './../../api/service';
import 'react-confirm-alert/src/react-confirm-alert.css';
import PurchaseDet from './Comp/PurchaseDet';

export default class Purchase extends Component {
    constructor(props) {
        super(props);

        

        this.state={
            suppliers: [],
            brands: [],
            products: [],
            isLoading: false
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
    }


    
  render() {
    return (
      <div className="container-fluid">
            <Notifications />
            <h3>Purchase</h3>
            <PurchaseDet brands={this.state.brands} products={this.state.products} suppliers={this.state.suppliers} />
      </div>
    )
  }
}
