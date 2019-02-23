import React, { Component } from 'react';
import { PostData, GetData } from './../api/service';
import BarcodePrint from './BarcodePrint';

export default class BarContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brands: [],
            products: [],
            f_products: [],
            no_barcode: '',
            barcode: '',
            brand_id: '',
            product_id: '',
            status: false,
            print:{
                no_barcode: '',
                bar: ''
            },
            error: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })

        if(e.target.name === 'brand_id'){
            let products = this.state.products;
            let results = products.filter((el) => el.brand_id === e.target.value);
            this.setState({
                f_products: results
            })
        }

        if(e.target.name === 'product_id'){
            this.setState({
                barcode: e.target.value
            })
        }

        if (e.target.name === 'barcode') {
            let barcode = e.target.value;
            let products = this.state.products;
            this.setState({
                f_products: products
            })
            let results = products.filter((el) => el.barcode === barcode);
            let product_id = '';
            let brand_id = '';
            if(Array.isArray(results) && results.length > 0){
                
                product_id = barcode;
                brand_id = results[0]['brand_id'];
            }
            
            this.setState({
                brand_id: brand_id,
                product_id: product_id,
            })

        }
    }

    componentDidMount(){
        this._initialFetch();
    }

    handleSubmit(e){
        e.preventDefault();
        let barcode = this.state.barcode;
        let no_barcode = this.state.no_barcode;

        let print = this.state.print;
        print['bar'] = barcode;
        print['no_barcode'] = no_barcode;

        this.setState({
            print: print,
            status: true
        })


    }

    handleSubmitSecond = (e) => {
        e.preventDefault();

        let barcode = this.state.barcode;
        let no_barcode = this.state.no_barcode;

        //validate availability of the barcode

        let products = this.state.products;
        let r = products.filter(el => el.barcode === barcode);
        if(Array.isArray(r) && r.length > 0){
            let print = this.state.print;
            print['bar'] = barcode;
            print['no_barcode'] = no_barcode;

            this.setState({
                print: print,
                status: true,
                error: ''
            })
        }else{
            this.setState({
                error: 'No Barcode found, Please insert it correctly'
            })
        }
    }

    onCloseClick(){
        let print = this.state.print;
        print['bar'] = '',
        print['no_barcode'] = '';
        this.setState({
            print: print,
            status: false
        })
    }



    render() {
        let brands_here = this.state.brands;
        let i = [];
        if (brands_here.length > 0){
            i = brands_here.map((el,index) => 
                <option key={index} value={el.brand_id}>{el.brand_name}</option>
            )
        }

        let f_products = this.state.f_products;
        let j = [];
        if (f_products.length > 0) {
            j = f_products.map((el, index) =>
                <option key={index} value={el.barcode}>{el.product_name} - {el.model}</option>
            )
        }
        return (
            <div className="container">

                <h1>Barcode Generation</h1>

                <hr />

                <form className="form form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Brand &nbsp;</label>
                        <select className="form-control input-sm"
                            name="brand_id"
                            onChange={this.handleChange}
                            value={this.state.brand_id}
                            required={true}
                        >
                            <option value="">Choose Brand</option>
                            {i}
                        </select>
                    </div>
                    &nbsp; &nbsp;
                <div className="form-group">
                        <label>Product &nbsp;</label>
                        <select className="form-control input-sm"
                            name="product_id"
                            onChange={this.handleChange}
                            value={this.state.product_id}
                            required={true}
                        >
                            <option value="">Choose Product</option>
                            {j}
                        </select>
                    </div>
                    &nbsp; &nbsp;
                    <div className="form-group">
                        <label>Barcode </label>&nbsp;<span style={{ color: 'red' }}>{this.state.error}</span>&nbsp;
                        <input className="form-control input-sm"
                            type="text"
                            name="barcode"
                            onChange={this.handleChange}
                            value={this.state.barcode}
                            placeholder="Type your barcode"
                            required={true} />
                    </div>
                    &nbsp; &nbsp;
                <div className="form-group">
                        <label>No of Barcodes &nbsp;</label>
                        <input className="form-control input-sm"
                            type="number"
                            name="no_barcode"
                            onChange={this.handleChange}
                            value={this.state.no_barcode}
                            placeholder="No of barcodes" 
                            required={true} />
                    </div>
                    &nbsp; &nbsp;
                <div className="form-group">
                        <button type="submit" className="btn btn-sm btn-primary">Generate</button>
                    </div>
                </form>

                

                {this.state.status ? <BarcodePrint onCloseClick={this.onCloseClick.bind(this)} no_barcode={this.state.print['no_barcode']} bar={this.state.print['bar']} /> : null }

            </div>
        )
    }
}
