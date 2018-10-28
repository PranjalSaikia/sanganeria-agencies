import React, { Component } from 'react'

class TempInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            f_products: [],
            type: '1',
            barcode: '',
            brand_id: '',
            product_id: '',
            qty: '',
            mrp: '',
            disc_p: '',
            disc_a: '',
            amount: '',
            cgst: '',
            sgst: '',
            igst: '',
            tax: '0.00',
            gtot: '0.00',
            view: [],
            errors: {
                qty: ''
            },
            gst: '1',
            btnDis: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        localStorage.setItem('type', 1);
        this.setState({
            gst: '1'
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })



        if (e.target.name === 'type') {
            localStorage.setItem('type', e.target.value);
        }

        if (e.target.name === 'barcode') {
            let products = this.props.products;
            let results = products.filter((el) => el.barcode === e.target.value);
            if (results.length > 0) {
                let results_1 = products.filter((el) => el.brand_id === results[0].brand_id);
                this.setState({
                    brand_id: results[0].brand_id,
                    product_id: results[0].product_id,
                    mrp: results[0].mrp,
                    f_products: results_1
                })

                if (this.state.gst === '1') {
                    this.setState({
                        cgst: results[0].cgst,
                        sgst: results[0].sgst,
                        igst: '0.00'
                    })
                } else {
                    this.setState({
                        cgst: '0.00',
                        sgst: '0.00',
                        igst: results[0].igst
                    })
                }
                this.props.setTable(results);
            }
        }

        if (e.target.name === 'brand_id') {
            let products = this.props.products;
            let results = products.filter((el) => el.brand_id === e.target.value);
            this.setState({
                f_products: results
            })
        }

        if (e.target.name === 'product_id') {
            let products = this.props.products;
            let results = products.filter((el) => el.product_id === e.target.value);
            if (results.length > 0) {
                this.setState({
                    brand_id: results[0].brand_id,
                    product_id: results[0].product_id,
                    barcode: results[0].barcode,
                    mrp: results[0].mrp,
                })

                if (this.state.gst === '1') {
                    this.setState({
                        cgst: results[0].cgst,
                        sgst: results[0].sgst,
                        igst: '0.00'
                    })
                } else {
                    this.setState({
                        cgst: '0.00',
                        sgst: '0.00',
                        igst: results[0].igst
                    })
                }
                this.props.setTable(results);
            }
        }

        if (e.target.name === 'qty') {
            //stock check
            if (this.checkqty(this.state.barcode, e.target.value)) {
                //entry
                let qty = e.target.value;
                let mrp = this.state.mrp;
                let disc_p = this.state.disc_p;
                let disc_a = this.state.disc_a;
                let total = this.state.amount;

                if (e.target.value !== '') {
                    if (mrp === '') {
                        mrp = 0;
                    }
                    if (disc_p === '') {
                        disc_p = 0;
                    }
                    if (disc_a === '') {
                        disc_a = 0;
                    }
                    if (total === '') {
                        total = 0;
                    }

                    let subTotal = parseFloat(qty) * parseFloat(mrp);
                    disc_a = subTotal * parseFloat(disc_p) / 100;
                    if (subTotal !== 0) {
                        disc_p = disc_a * 100 / subTotal;
                    } else {
                        disc_p = 0;
                    }
                    total = parseFloat(subTotal) - parseFloat(disc_p);

                    //tax calculation
                    let cgst = this.state.cgst;
                    let sgst = this.state.sgst;
                    let igst = this.state.igst;
                    let tax = this.state.tax;
                    let gtot = this.state.gtot;

                    let cgst_a = parseFloat(cgst) * total / 100;
                    let sgst_a = parseFloat(sgst) * total / 100;
                    let igst_a = parseFloat(igst) * total / 100;
                    tax = cgst_a + sgst_a + igst_a;
                    gtot = parseFloat(total) + parseFloat(tax);


                    this.setState({
                        qty: qty,
                        mrp: mrp,
                        disc_p: disc_p,
                        disc_a: disc_a,
                        amount: total,
                        tax: tax.toFixed(2),
                        gtot: gtot.toFixed(2),
                        btnDis: false,
                        errors: {}
                    })
                }
            } else {
                let errors = {};
                errors['qty'] = "Out of stock";
                this.setState({
                    errors: errors,
                    amount: '',
                    btnDis: true
                })
            }



        }


        if (e.target.name === 'disc_p') {
            let qty = this.state.qty;
            let mrp = this.state.mrp;
            let disc_p = e.target.value;
            let disc_a = this.state.disc_a;
            let total = this.state.amount;
            if (e.target.value !== '') {
                if (mrp === '') {
                    mrp = 0;
                }
                if (qty === '') {
                    qty = 0;
                }
                if (disc_p === '') {
                    disc_p = 0;
                }
                if (disc_a === '') {
                    disc_a = 0;
                }
                if (total === '') {
                    total = 0;
                }

                let subTotal = parseFloat(qty) * parseFloat(mrp);
                disc_a = subTotal * parseFloat(disc_p) / 100;
                if (subTotal !== 0) {
                    disc_p = disc_a * 100 / subTotal;
                } else {
                    disc_p = 0;
                }
                total = parseFloat(subTotal) - parseFloat(disc_a);

                //tax calculation
                let cgst = this.state.cgst;
                let sgst = this.state.sgst;
                let igst = this.state.igst;
                let tax = this.state.tax;
                let gtot = this.state.gtot;

                let cgst_a = parseFloat(cgst) * total / 100;
                let sgst_a = parseFloat(sgst) * total / 100;
                let igst_a = parseFloat(igst) * total / 100;
                tax = cgst_a + sgst_a + igst_a;
                gtot = parseFloat(total) + parseFloat(tax);

                this.setState({
                    qty: qty,
                    mrp: mrp,
                    disc_p: disc_p,
                    disc_a: disc_a.toFixed(2),
                    amount: total.toFixed(2),
                    tax: tax.toFixed(2),
                    gtot: gtot.toFixed(2),
                })
            }

        }


        if (e.target.name === 'disc_a') {
            let qty = this.state.qty;
            let mrp = this.state.mrp;
            let disc_p = this.state.disc_p;
            let disc_a = e.target.value;
            let total = this.state.amount;
            if (e.target.value !== '') {
                if (mrp === '') {
                    mrp = 0;
                }
                if (qty === '') {
                    qty = 0;
                }

                if (disc_p === '') {
                    disc_p = 0;
                }
                if (total === '') {
                    total = 0;
                }

                let subTotal = parseFloat(qty) * parseFloat(mrp);
                //disc_a = subTotal * parseFloat(disc_p) / 100;
                if (subTotal !== 0) {
                    disc_p = disc_a * 100 / subTotal;
                } else {
                    disc_p = 0;
                }
                total = parseFloat(subTotal) - parseFloat(disc_a);

                //tax calculation
                let cgst = this.state.cgst;
                let sgst = this.state.sgst;
                let igst = this.state.igst;
                let tax = this.state.tax;
                let gtot = this.state.gtot;

                let cgst_a = parseFloat(cgst) * total / 100;
                let sgst_a = parseFloat(sgst) * total / 100;
                let igst_a = parseFloat(igst) * total / 100;
                tax = cgst_a + sgst_a + igst_a;
                gtot = parseFloat(total) + parseFloat(tax);

                this.setState({
                    qty: qty,
                    mrp: mrp,
                    disc_p: disc_p,
                    disc_a: e.target.value,
                    amount: total.toFixed(2),
                    tax: tax.toFixed(2),
                    gtot: gtot.toFixed(2),
                })
            }

        }

        if(e.target.name === 'gst'){
            let products = this.props.products;
            let results = products.filter((el) => el.barcode === this.state.barcode);
            let cgst = results[0].cgst;
            let sgst = results[0].sgst;
            let igst = results[0].igst;

            if(e.target.value === '1'){
                this.setState({
                    cgst: cgst,
                    sgst: sgst,
                    igst: '0.00'
                })
            }else{
                this.setState({
                    cgst: '0.00',
                    sgst: '0.00',
                    igst: igst
                })
            }



            let cgst1 = this.state.cgst;
            let sgst1 = this.state.sgst;
            let igst1 = this.state.igst;
            let total = this.state.amount;

            let cgst_a = parseFloat(cgst1) * total / 100;
            let sgst_a = parseFloat(sgst1) * total / 100;
            let igst_a = parseFloat(igst1) * total / 100;
            let tax = cgst_a + sgst_a + igst_a;
            let gtot = parseFloat(total) + parseFloat(tax);

            this.setState({
                tax: tax.toFixed(2),
                gtot: gtot.toFixed(2),
            })
            
        }


        if(e.target.name === 'cgst'){
            let cgst = e.target.value;
            let sgst = this.state.sgst;
            let igst = this.state.igst;
            let total = this.state.amount;

            let cgst_a = parseFloat(cgst) * total / 100;
            let sgst_a = parseFloat(sgst) * total / 100;
            let igst_a = parseFloat(igst) * total / 100;
            let tax = cgst_a + sgst_a + igst_a;
            let gtot = parseFloat(total) + parseFloat(tax);

            this.setState({
                tax: tax.toFixed(2),
                gtot: gtot.toFixed(2),
            })
        }

        if (e.target.name === 'sgst') {
            let sgst = e.target.value;
            let cgst = this.state.cgst;
            let igst = this.state.igst;
            let total = this.state.amount;

            let cgst_a = parseFloat(cgst) * total / 100;
            let sgst_a = parseFloat(sgst) * total / 100;
            let igst_a = parseFloat(igst) * total / 100;
            let tax = cgst_a + sgst_a + igst_a;
            let gtot = parseFloat(total) + parseFloat(tax);

            this.setState({
                tax: tax.toFixed(2),
                gtot: gtot.toFixed(2),
            })
        }
        if (e.target.name === 'igst') {
            let igst = e.target.value;
            let sgst = this.state.sgst;
            let cgst = this.state.cgst;
            let total = this.state.amount;

            let cgst_a = parseFloat(cgst) * total / 100;
            let sgst_a = parseFloat(sgst) * total / 100;
            let igst_a = parseFloat(igst) * total / 100;
            let tax = cgst_a + sgst_a + igst_a;
            let gtot = parseFloat(total) + parseFloat(tax);

            this.setState({
                tax: tax.toFixed(2),
                gtot: gtot.toFixed(2),
            })
        }
        


    }

    checkqty(barcode, qty) {
        let products = this.props.products;
        let results = products.filter((el) => el.barcode === barcode);
        if (results.length > 0) {
            let temp_stock = 0;
            let current_qty = results[0].qty;
            let tab_data = JSON.parse(localStorage.getItem('invoice_det'));
            //console.log(tab_data);
            if (tab_data.table_data.length > 0) {
                let temp_det = tab_data.table_data;
                let temp_results = temp_det.filter((el) => el.barcode === barcode);
                if (temp_results.length === 0) {
                    temp_stock = 0;
                } else {
                    temp_stock = temp_results[0].qty;
                }
            } else {
                temp_stock = 0;
            }

            if (qty > current_qty - temp_stock) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = {
            barcode: this.state.barcode,
            qty: this.state.qty,
            mrp: this.state.mrp,
            disc_p: this.state.disc_p,
            disc_a: this.state.disc_a,
            amount: this.state.amount,
            cgst: this.state.cgst,
            sgst: this.state.sgst,
            igst: this.state.igst,
            tax: this.state.tax,
            gtot: this.state.gtot,
        }

        this.props.sendData(data);

        this.setState({
            f_products: [],
            barcode: '',
            brand_id: '',
            product_id: '',
            qty: '',
            mrp: '',
            disc_p: '',
            disc_a: '',
            amount: '',
            cgst: '',
            sgst: '',
            igst: '',
            tax: '0.00',
            gtot: '0.00',
            view: [],
            errors: {
                qty: ''
            },
            btnDis: true
        })


    }

    render() {
        let brands = this.props.brands;
        let i = [];
        if (brands.length > 0) {
            i = brands.map((el, index) =>
                <option key={index} value={el.brand_id}>{el.brand_name}</option>
            )
        }

        let products = this.state.f_products;
        let j = [];
        if (products.length > 0) {
            j = products.map((el, index) =>
                <option key={index} value={el.product_id}>{el.product_name} - {el.model}</option>
            )
        }
        return (
            <div className="bglight">
                <form className="form" onSubmit={this.handleSubmit}>
                    <table width="100%" className="">
                        <tbody>
                            <tr style={{ height: '40px' }}>
                                <td><b>Type</b></td>
                                <td colSpan="3">
                                    <select
                                        className="form-control input-sm"
                                        name="type"
                                        onChange={this.handleChange}
                                        value={this.state.type}
                                        required={true}>
                                        <option value="1">B2C</option>
                                        <option value="2">B2B</option>
                                    </select>
                                </td>
                            </tr>
                            <tr style={{ height: '40px' }}>
                                <td width="20%"><b>Barcode</b></td>
                                <td colSpan="3">
                                    <input
                                        type="text"
                                        name="barcode"
                                        onChange={this.handleChange}
                                        value={this.state.barcode}
                                        className="form-control input-sm"
                                        placeholder="Scan your Barcode"
                                        required={true} />
                                </td>
                            </tr>
                            <tr style={{ height: '40px' }}>
                                <td><b>Brand</b></td>
                                <td colSpan="3">
                                    <select
                                        className="form-control input-sm"
                                        name="brand_id"
                                        onChange={this.handleChange}
                                        value={this.state.brand_id}
                                        required={true}>
                                        <option value="">Choose brand</option>
                                        {i}
                                    </select>
                                </td>
                            </tr>
                            <tr style={{ height: '40px' }}>
                                <td><b>Product</b></td>
                                <td colSpan="3">
                                    <select
                                        className="form-control input-sm"
                                        name="product_id"
                                        onChange={this.handleChange}
                                        value={this.state.product_id}
                                        required={true}>
                                        <option value="">Choose Product</option>
                                        {j}
                                    </select>
                                </td>
                            </tr>
                            <tr style={{ height: '40px' }}>
                                <td><b>Qty</b></td>
                                <td colSpan="3">
                                    <span style={{ color: 'red' }}>{this.state.errors['qty']}</span>
                                    <input
                                        className="form-control input-sm"
                                        placeholder="Qty"
                                        name="qty"
                                        onChange={this.handleChange}
                                        value={this.state.qty}
                                        required={true} />
                                </td>
                            </tr>
                            <tr style={{ height: '40px' }}>
                                <td><b>MRP</b></td>
                                <td colSpan="3">
                                    <input
                                        className="form-control input-sm"
                                        placeholder="MRP"
                                        name="mrp"
                                        onChange={this.handleChange}
                                        value={this.state.mrp}
                                        required={true} />
                                </td>
                            </tr>
                            <tr style={{ height: '40px' }}>
                                <td><b>Discount</b></td>
                                <td>
                                    <input
                                        className="form-control input-sm"
                                        placeholder="Discount(%)"
                                        name="disc_p"
                                        onChange={this.handleChange}
                                        value={this.state.disc_p}
                                        required={true} />
                                </td>
                                <td colSpan="2">
                                    <input
                                        className="form-control input-sm"
                                        placeholder="Discount"
                                        name="disc_a"
                                        onChange={this.handleChange}
                                        value={this.state.disc_a}
                                        required={true} />
                                </td>
                            </tr>
                            <tr style={{ height: '40px' }}>
                                <td><b>Total</b></td>
                                <td colSpan="3">
                                    <input
                                        className="form-control input-sm"
                                        placeholder="Total"
                                        name="amount"
                                        onChange={this.handleChange}
                                        value={this.state.amount}
                                        required={true} />
                                </td>
                            </tr>
                            <tr style={{ height: '40px' }}>
                                <td><b>GST</b></td>
                                <td colSpan="3">
                                    <select className="form-control input-sm"
                                        name="gst"
                                        value={this.state.gst}
                                        onChange={this.handleChange}>
                                        <option value="1">Intra-state</option>
                                        <option value="2">Inter-state</option>
                                    </select>
                                </td>
                            </tr>
                            <tr style={{ height: '40px' }}>
                                <td><b>GST</b></td>
                                <td>
                                    <input
                                        className="form-control input-sm"
                                        placeholder="CGST"
                                        name="cgst"
                                        onChange={this.handleChange}
                                        value={this.state.cgst}
                                        required={true} />
                                </td>
                                <td>
                                    <input
                                        className="form-control input-sm"
                                        placeholder="SGST"
                                        name="sgst"
                                        onChange={this.handleChange}
                                        value={this.state.sgst}
                                        required={true} />
                                </td>
                                <td>
                                    <input
                                        className="form-control input-sm"
                                        placeholder="IGST"
                                        name="igst"
                                        onChange={this.handleChange}
                                        value={this.state.igst}
                                        required={true} />
                                </td>
                            </tr>
                            <tr style={{ height: '40px' }}>
                                <td><b>Tax</b></td>
                                <td>
                                    <input
                                        className="form-control input-sm"
                                        placeholder="Tax"
                                        name="tax"
                                        onChange={this.handleChange}
                                        value={this.state.tax}
                                        required={true} />
                                </td>
                                <td colSpan="2">
                                    <input
                                        className="form-control input-sm"
                                        placeholder="Total"
                                        name="gtot"
                                        onChange={this.handleChange}
                                        value={this.state.gtot}
                                        required={true} />
                                </td>
                            </tr>
                            <tr style={{ height: '40px' }}>
                                <td colSpan="4" align="right"><button type="submit" disabled={this.state.btnDis} className="btn btn-sm btn-primary">Add</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}
export default TempInput;