import React, { Component } from 'react'

export default class EntryEdit extends Component {
    constructor(props) {
        super(props);

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;


        this.state = {
            f_products: [],
            barcode: '',
            brand_id: '',
            product_id: '',
            entry_date: '',
            qty: '',
            cost: '',
            total: '',
            freight: '',
            gtot: '',
            bill: '',
            bill_date: '',
            mrp: '',
            type: 'edit',
            id: '',
            po_no: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    _getInitialState() {



        this.setState({
            f_products: [],
            barcode: '',
            brand_id: '',
            product_id: '',
            entry_date: '',
            qty: '',
            cost: '',
            total: '',
            freight: '',
            gtot: '',
            bill: '',
            bill_date: '',
            mrp: '',
            po_no: '',
            id: ''
        })
    }


    _initialSet() {
        let editData = this.props.setEditData;
        let products = this.props.products;
        let results = products.filter((el) => el.brand_id === editData[0].brand_id);
        this.setState({
            f_products: results,
            barcode: editData[0].barcode,
            brand_id: editData[0].brand_id,
            product_id: editData[0].barcode,
            entry_date: editData[0].date1,
            qty: editData[0].qty,
            cost: editData[0].cost,
            total: editData[0].tot,
            freight: editData[0].fre,
            gtot: editData[0].gtot,
            bill: editData[0].bill,
            bill_date: editData[0].date1,
            mrp: editData[0].mrp,
            supplier_id: editData[0].supplier_id,
            id: editData[0].id
        })
    }

    componentDidMount() {
        this._initialSet();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this._initialSet();
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

        if (e.target.name === 'brand_id') {
            let products = this.props.products;
            let results = products.filter((el) => el.brand_id === e.target.value);
            this.setState({
                f_products: results
            })
        }

        if (e.target.name === 'product_id') {
            this.setState({
                barcode: e.target.value
            })
        }

        if (e.target.name === 'barcode') {
            let products = this.props.products;
            let results = products.filter((el) => el.barcode === e.target.value);
            if (results.length > 0) {
                let results_1 = products.filter((el) => el.brand_id === results[0].brand_id);
                this.setState({
                    f_products: results_1,
                    barcode: e.target.value,
                    product_id: results[0].barcode,
                    brand_id: results[0].brand_id
                })
            }

        }


        if (e.target.name === 'qty') {
            let qty = e.target.value;
            let cost = this.state.cost;
            let freight = this.state.freight;
            let gtot = this.state.gtot;
            if (qty !== '' && cost !== '') {
                let total = parseFloat(qty) * parseFloat(cost);
                if (freight === '') {
                    freight = 0;
                }
                if (gtot === '') {
                    gtot = 0;
                }

                let gtot = parseFloat(total) + parseFloat(freight);

                this.setState({
                    total: parseFloat(total).toFixed(2),
                    gtot: gtot.toFixed(2)
                })
            }

        }


        if (e.target.name === 'cost') {
            let qty = this.state.qty;
            let cost = e.target.value;
            let freight = this.state.freight;
            let gtot = this.state.gtot;
            if (qty !== '' && cost !== '') {
                let total = parseFloat(qty) * parseFloat(cost);
                if (freight === '') {
                    freight = 0;
                }
                if (gtot === '') {
                    gtot = 0;
                }

                let gtot = parseFloat(total) + parseFloat(freight);

                this.setState({
                    total: parseFloat(total).toFixed(2),
                    gtot: gtot.toFixed(2)
                })
            }

        }

        if (e.target.name === 'freight') {
            let qty = this.state.qty;
            let cost = this.state.cost;
            let freight = e.target.value;
            let gtot = this.state.gtot;
            if (qty !== '' && cost !== '') {
                let total = parseFloat(qty) * parseFloat(cost);
                if (freight === '') {
                    freight = 0;
                }
                if (gtot === '') {
                    gtot = 0;
                }

                let gtot = parseFloat(total) + parseFloat(freight);

                this.setState({
                    total: parseFloat(total).toFixed(2),
                    gtot: gtot.toFixed(2)
                })
            }
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        const data = {
            barcode: this.state.barcode,
            date1: this.state.entry_date,
            qty: this.state.qty,
            cost: this.state.cost,
            total: this.state.total,
            freight: this.state.freight,
            gtot: this.state.gtot,
            bill: this.state.bill,
            bill_date: this.state.bill_date,
            mrp: this.state.mrp,
            po_no: '',
            id: this.state.id,
            type: 'edit'
        }

        //send the data

        this.props.updateData(data);

        //reinitialize states

        this._getInitialState();



    }

    render() {
        let brands_here = this.props.brands;
        let i = [];
        if (brands_here.length > 0) {
            i = brands_here.map((el, index) =>
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

        let suppliers_here = this.props.suppliers;
        let k = [];
        if (suppliers_here.length > 0) {
            k = suppliers_here.map((el, index) =>
                <option key={index} value={el.supplier_id}>{el.supplier_name}</option>
            )
        }
        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit} className="alert-danger" style={{ padding: '20px' }}>
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <label>Entry Date &nbsp;</label>
                                    <input className="form-control input-sm"
                                        type="date"
                                        name="entry_date"
                                        onChange={this.handleChange}
                                        value={this.state.entry_date}
                                        required={true} />
                                </td>
                                <td>
                                    <label>Select Brand &nbsp;</label>
                                    <select className="form-control input-sm"
                                        name="brand_id"
                                        onChange={this.handleChange}
                                        value={this.state.brand_id}
                                        required={true}
                                    >
                                        <option value="">Choose Brand</option>
                                        {i}
                                    </select>
                                </td>

                                <td width="25%">
                                    <label>Select Product &nbsp;</label>
                                    <select className="form-control input-sm"
                                        name="product_id"
                                        onChange={this.handleChange}
                                        value={this.state.product_id}
                                        required={true}
                                    >
                                        <option value="">Choose Product</option>
                                        {j}
                                    </select>
                                </td>
                                <td>
                                    <label>or Scan Barcode &nbsp;</label>
                                    <input className="form-control input-sm"
                                        type="text"
                                        name="barcode"
                                        onChange={this.handleChange}
                                        value={this.state.barcode}
                                        placeholder="scan here"
                                        required={true} />
                                </td>
                                <td>
                                    <label>Qty Received &nbsp;</label>
                                    <input className="form-control input-sm"
                                        type="text"
                                        name="qty"
                                        onChange={this.handleChange}
                                        value={this.state.qty}
                                        placeholder="Qty Received"
                                        required={true} />
                                </td>
                                <td>
                                    <label>Cost per unit &nbsp;</label>
                                    <input className="form-control input-sm"
                                        type="text"
                                        name="cost"
                                        onChange={this.handleChange}
                                        value={this.state.cost}
                                        placeholder="Cost per unit"
                                        required={true} />
                                </td>

                            </tr>
                            <tr style={{ height: '70px' }}>
                                <td>
                                    <label>Total Amount &nbsp;</label>
                                    <input className="form-control input-sm"
                                        type="text"
                                        name="total"
                                        onChange={this.handleChange}
                                        value={this.state.total}
                                        placeholder="Total Cost"
                                        required={true} />
                                </td>
                                <td>
                                    <label>Freight Charges &nbsp;</label>
                                    <input className="form-control input-sm"
                                        type="text"
                                        name="freight"
                                        onChange={this.handleChange}
                                        value={this.state.freight}
                                        placeholder="Freight Charges"
                                        required={true} />
                                </td>
                                <td>
                                    <label>Grand Total &nbsp;</label>
                                    <input className="form-control input-sm"
                                        type="text"
                                        name="gtot"
                                        onChange={this.handleChange}
                                        value={this.state.gtot}
                                        placeholder="Grand Total"
                                        required={true} />
                                </td>
                                {/* <td>
                                    <label>MRP per unit &nbsp;</label>
                                    <input className="form-control input-sm"
                                        type="text"
                                        name="mrp"
                                        onChange={this.handleChange}
                                        value={this.state.mrp}
                                        placeholder="MRP per unit"
                                        required={true} />
                                </td> */}

                                <td>
                                    <label>Supplier &nbsp;</label>
                                    <select className="form-control input-sm"
                                        type="text"
                                        name="supplier_id"
                                        onChange={this.handleChange}
                                        value={this.state.supplier_id}
                                        required={true} >
                                        <option value="">Choose Supplier</option>
                                        {k}
                                    </select>
                                </td>
                                <td>
                                    <label>Purchase Bill No &nbsp;</label>
                                    <input className="form-control input-sm"
                                        type="text"
                                        name="bill"
                                        onChange={this.handleChange}
                                        value={this.state.bill}
                                        placeholder="Purchase Bill No"
                                    />
                                </td>
                                <td>
                                    <label>Purchase Bill Date &nbsp;</label>
                                    <input className="form-control input-sm"
                                        type="date"
                                        name="bill_date"
                                        onChange={this.handleChange}
                                        value={this.state.bill_date}
                                        placeholder="Purchase Bill Date"
                                    />
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td colSpan="6" align="right">
                                    <button className="btn btn-sm btn-primary" type="submit">Update</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>




                </form>
            </div>
        )
    }
}
