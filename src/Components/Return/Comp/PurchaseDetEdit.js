import React, { Component } from 'react'
import Notifications, { notify } from 'react-notify-toast';
import TempTable from './TempTable';
import { PostData } from '../../../api/service';

export default class PurchaseDetEdit extends Component {
    constructor(props) {
        super(props);
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
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
            entry_date: today,
            against_bill_no: '',
            supplier_id: '',
            purchase_bill: '',
            purchase_bill_date: '',
            brand_id: '',
            product_id: '',
            barcode: '',
            qty: '',
            cost: '',
            mrp: '',
            total: '',
            temp: [],
            bill_total: 0.00,
            cgst: 0.00,
            sgst: 0.00,
            igst: 0.00,
            tax: 0.00,
            sp_discount: 0.00,
            roff: 0.00,
            gtot: 0.00,
            id: '',
            main_id: '',
            imei_temp: '',
            imei: '',
            discount: '0.00',
            discount_amount: '0.00',
            sub_total: '0.00',
            sp_discount: '0.00',
            edit: false,
            inn: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFinalSubmit = this.handleFinalSubmit.bind(this);
        this.handleChangeTotal = this.handleChangeTotal.bind(this);
    }

    _getInitial() {

        this.setState({
            supplier_id: '',
            purchase_bill: '',
            against_bill_no: '',
            purchase_bill_date: '',
            brand_id: '',
            product_id: '',
            barcode: '',
            qty: '',
            cost: '',
            mrp: '',
            total: '',
            temp: [],
            bill_total: 0.00,
            cgst: 0.00,
            sgst: 0.00,
            igst: 0.00,
            tax: 0.00,
            sp_discount: 0.00,
            roff: 0.00,
            gtot: 0.00,
            imei_temp: '',
            imei: '',
            discount: '0.00',
            discount_amount: '0.00',
            sub_total: '0.00',
            sp_discount: '0.00',
            edit: false,
            inn: '',
            id: '',
            main_id: ''
        })
    }

    _setInitialData() {
        let data = this.props.data;
        //console.log(data)
        this.setState({
            temp: data[0].table_data,
            entry_date: data[0].entry_date,
            against_bill_no: data[0].against_bill_no,
            supplier_id: data[0].supplier_id,
            purchase_bill: data[0].purchase_bill,
            purchase_bill_date: data[0].purchase_bill_date,
            bill_total: data[0].bill_total,
            sp_discount: data[0].discount,
            roff: data[0].roff,
            gtot: data[0].gtot,
            id: data[0].id,
            main_id: data[0].id,

        })




    }

    handleIMEI = (e) => {
        if (e.target.value !== '') {
            let imei = this.state.imei;
            imei = imei + e.target.value + ','
            this.setState({
                imei,
                imei_temp: ''
            })
        }
    }

    componentDidMount() {
        this._setInitialData();
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

        if (e.target.name === 'qty') {
            let qty = e.target.value;
            let cost = this.state.cost;
            if (cost === '') {
                cost = 0;
            }
            let total = parseFloat(qty) * parseFloat(cost);

            this.setState({
                cost: cost,
                total: total.toFixed(2)
            })
        }

        if (e.target.name === 'cost') {
            this.calculate(this.state.qty, e.target.cost, this.state.discount, this.state.discount_amount, this.state.csgt, this.state.sgst, this.state.igst)
        }




        if (e.target.name === 'bill_total') {


        }

        if (e.target.name === 'cgst') {
            this.calculate(this.state.qty, this.state.cost, this.state.discount, this.state.discount_amount, e.target.value, this.state.sgst, this.state.igst)

        }

        if (e.target.name === 'sgst') {
            this.calculate(this.state.qty, this.state.cost, this.state.discount, this.state.discount_amount, this.state.cgst, e.target.value, this.state.igst)

        }
        if (e.target.name === 'igst') {
            this.calculate(this.state.qty, this.state.cost, this.state.discount, this.state.discount_amount, this.state.cgst, this.state.sgst, e.target.value)

        }
        if (e.target.name === 'discount') {
            this.calculate(this.state.qty, this.state.cost, e.target.value, this.state.discount_amount, this.state.cgst, this.state.sgst, this.state.igst)

        }

        if (e.target.name === 'discount_amount') {
            this.calculate(this.state.qty, this.state.cost, this.state.discount, e.target.value, this.state.cgst, this.state.sgst, this.state.igst)

        }

        if (e.target.name === 'sp_discount') {

            let sp_discount = e.target.value;
            let roff = this.state.roff;

            let gtot = parseFloat(this.state.bill_total) - parseFloat(sp_discount) + parseFloat(roff);

            this.setState({
                gtot: gtot.toFixed(2),

            })

        }
        if (e.target.name === 'roff') {
            let roff = e.target.value;
            let sp_discount = this.state.sp_discount;

            let gtot = parseFloat(this.state.bill_total) - parseFloat(sp_discount) + parseFloat(roff);

            this.setState({
                gtot: gtot.toFixed(2),

            })

        }
    }


    calculate = (qty, cost, discount, discount_amount, cgst, sgst, igst) => {
        let amount = parseFloat(qty) * parseFloat(cost);
        let d_amount = amount * parseFloat(discount) / 100;
        //let d = parseFloat(discount_amount) * 100 / parseFloat(amount);

        let sub_total = amount - d_amount;

        let tax_p = parseFloat(cgst) + parseFloat(sgst) + parseFloat(igst);

        let tax = sub_total * tax_p / 100;

        let total = sub_total + tax;

        this.setState({
            discount_amount: d_amount.toFixed(2),
            sub_total: sub_total.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2)
        })

    }


    handleChangeTotal(total) {

        let roff = this.state.roff;

        let gtot = parseFloat(total) + parseFloat(roff);

        this.setState({
            gtot: gtot.toFixed(2)
        })
    }


    handleSubmit(e) {
        e.preventDefault();

        let temp = this.state.temp;

        let brand_name = "";
        let product_name = "";

        let brands = this.props.brands;
        let products = this.props.products;

        let result1 = brands.filter((el) => el.brand_id === this.state.brand_id);
        let result2 = products.filter((el) => el.barcode === this.state.barcode);


        const data = {
            brand_id: this.state.brand_id,
            brand_name: result1[0].brand_name,
            product_name: result2[0].product_name,
            product_id: result2[0].product_id,
            barcode: this.state.barcode,
            qty: this.state.qty,
            cost: this.state.cost,
            mrp: this.state.mrp,
            total: this.state.total,
            imei: this.state.imei,
            discount: this.state.discount,
            discount_amount: this.state.discount_amount,
            cgst: this.state.cgst,
            sgst: this.state.sgst,
            igst: this.state.igst,
            tax: this.state.tax,
            sub_total: this.state.sub_total
        }

        if (this.state.edit) {
            //if edit
            temp.splice(this.state.inn, 1);
            temp.push(data);

        } else {
            temp.push(data);
        }

        //total calculation

        let total = 0;

        temp.map((el) => total += parseFloat(el.total));

        this.setState({
            temp: temp,
            bill_total: total.toFixed(2),
            brand_id: '',
            product_id: '',
            barcode: '',
            qty: '',
            cost: '',
            mrp: '',
            total: '',
            imei: '',
            discount: '0.00',
            discount_amount: '0.00',
            sub_total: '0.00',
            cgst: '0.00',
            sgst: '0.00',
            igst: '0.00',
            tax: '0.00',
            edit: false,
            inn: ''
        })

        this.handleChangeTotal(total);

    }


    onDelete(index) {
        let temp = this.state.temp;

        temp.splice(index, 1);

        let total = 0;

        temp.map((el) => total += parseFloat(el.total));


        this.setState({
            temp: temp,
            bill_total: total.toFixed(2)
        })
    }

    handleFinalSubmit() {
        const data = {
            id: this.state.id,
            main_id: this.state.main_id,
            entry_date: this.state.entry_date,
            supplier_id: this.state.supplier_id,
            against_bill_no: this.state.against_bill_no,
            purchase_bill: this.state.purchase_bill,
            purchase_bill_date: this.state.purchase_bill_date,
            bill_total: this.state.bill_total,
            sp_discount: this.state.sp_discount,
            roff: this.state.roff,
            gtot: this.state.gtot,
            table_data: this.state.temp
        }

        PostData('/api/return_update.php', data)
            .then((resp) => {
                if (resp.status === '200') {
                    notify.show(resp.data, 'success', 3000);
                    this._getInitial();
                    this.props.history.replace('/stock/purchasetable');
                } else {
                    notify.show(resp.data, 'error', 3000);
                }
            })


    }

    onEditClick = (data, index) => {

        this.setState({
            ...data,
            barcode: data.barcode,
            f_products: this.props.products,
            product_id: data.barcode,
            inn: index,
            edit: true
        })
    }

    onCancelClick = () => {
        this.setState({
            brand_id: '',
            
            product_id: '',
            barcode: '',
            qty: '',
            cost: '',
            mrp: '',
            total: '0.00',
            imei: '',
            discount: '0.00',
            discount_amount: '0.00',
            sub_total: '0.00',
            cgst: '0.00',
            sgst: '0.00',
            igst: '0.00',
            tax: '0.00',
            inn: '',
            edit: false
        })
    }


    render() {
        let i = [];
        let brands = this.props.brands;
        if (brands.length > 0) {
            i = brands.map((el, index) =>
                <option key={index} value={el.brand_id}>{el.brand_name}</option>)
        }

        let j = [];
        let products = this.state.f_products;
        if (products.length > 0) {
            j = products.map((el, index) =>
                <option key={index} value={el.barcode}>{el.product_name} - {el.model}</option>)
        }

        let k = [];
        let suppliers = this.props.suppliers;
        if (suppliers.length > 0) {
            k = suppliers.map((el, index) =>
                <option key={index} value={el.supplier_id}>{el.supplier_name}</option>)
        }
        return (
            <div>
                <Notifications />
                <table width="100%">
                    <tbody>
                        <tr>
                            <td width="25%">
                                <input type="hidden"
                                    name="id"
                                    value={this.state.id}
                                    onChange={this.handleChange} />
                                <label>Entry Date</label>
                                <input className="form-control input-sm"
                                    type="date"
                                    name="entry_date"
                                    value={this.state.entry_date}
                                    onChange={this.handleChange}
                                    required={true} />

                            </td>
                            <td>
                                <label>Against Bill No</label>
                                <input className="form-control input-sm"
                                    name="against_bill_no"
                                    value={this.state.against_bill_no}
                                    onChange={this.handleChange}
                                    required={true} />
                            </td>
                            <td width="25%">
                                <label>Supplier</label>
                                <select className="form-control input-sm"
                                    name="supplier_id"
                                    value={this.state.supplier_id}
                                    onChange={this.handleChange}
                                    required={true} >
                                    <option value="">Choose</option>
                                    {k}
                                </select>
                            </td>
                            <td>
                                <label>Purchase Bill No</label>
                                <input className="form-control input-sm"
                                    name="purchase_bill"
                                    value={this.state.purchase_bill}
                                    onChange={this.handleChange}
                                    required={true} />
                            </td>
                            <td>
                                <label>Purchase Bill Date</label>
                                <input className="form-control input-sm"
                                    type="date"
                                    name="purchase_bill_date"
                                    value={this.state.purchase_bill_date}
                                    onChange={this.handleChange}
                                    required={true} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <hr />
                <table width="100%" >
                    <tbody>
                        <tr>
                            <td width="30%">
                                <form onSubmit={this.handleSubmit}>

                                    <table width="100%">
                                        <tbody>
                                            <tr>
                                                <td width="20%">
                                                    <label>Brand</label>
                                                </td>
                                                <td width="80%" colSpan="3">
                                                    <select className="form-control input-sm"
                                                        name="brand_id"
                                                        value={this.state.brand_id}
                                                        onChange={this.handleChange}
                                                        required={true} >
                                                        <option value="">Choose</option>
                                                        {i}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="20%">
                                                    <label>Product</label>
                                                </td>
                                                <td width="80%" colSpan="3">

                                                    <select className="form-control input-sm"
                                                        name="barcode"
                                                        value={this.state.barcode}
                                                        onChange={this.handleChange}
                                                        required={true} >
                                                        <option value="">Choose</option>
                                                        {j}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="20%">
                                                    <label>Qty</label>
                                                </td>
                                                <td width="80%" colSpan="3">

                                                    <input className="form-control input-sm"
                                                        name="qty"
                                                        value={this.state.qty}
                                                        onChange={this.handleChange} />
                                                </td>
                                            </tr>
                                            <tr >
                                                <td width="20%">
                                                    <label>Cost</label>
                                                </td>
                                                <td width="80%" colSpan="3">

                                                    <input className="form-control input-sm"
                                                        name="cost"
                                                        value={this.state.cost}
                                                        onChange={this.handleChange}
                                                        required={true} />
                                                </td>
                                            </tr>
                                            <tr >
                                                <td width="20%">
                                                    <label>MRP</label>
                                                </td>
                                                <td width="100%" colSpan="3">

                                                    <input className="form-control input-sm"
                                                        name="mrp"
                                                        value={this.state.mrp}
                                                        onChange={this.handleChange}
                                                        required={true} />
                                                </td>
                                            </tr>
                                            <tr >
                                                <td width="20%">
                                                    <label>Discount</label>
                                                </td>
                                                <td width="100%" colSpan="3">

                                                    <input className="form-control input-sm"
                                                        name="discount"
                                                        value={this.state.discount}
                                                        onChange={this.handleChange}
                                                        required={true} />
                                                </td>
                                            </tr>
                                            <tr >
                                                <td width="20%">
                                                    <label>D Amount</label>
                                                </td>
                                                <td width="100%" colSpan="3">

                                                    <input className="form-control input-sm"
                                                        name="discount_amount"
                                                        value={this.state.discount_amount}
                                                        onChange={this.handleChange}
                                                        required={true} />
                                                </td>
                                            </tr>
                                            <tr >
                                                <td width="20%">
                                                    <label>Sub Total</label>
                                                </td>
                                                <td width="80%" colSpan="3">

                                                    <input className="form-control input-sm"
                                                        name="sub_total"
                                                        value={this.state.sub_total}
                                                        onChange={this.handleChange}
                                                        required={true} />
                                                </td>

                                            </tr>

                                            <tr >
                                                <td width="20%">
                                                    GST
                                                    </td>
                                                <td >
                                                    <label>CGST</label>
                                                    <input className="form-control input-sm"
                                                        name="cgst"
                                                        value={this.state.cgst}
                                                        onChange={this.handleChange}
                                                        required={true} />
                                                </td>
                                                <td >
                                                    <label>SGST</label>
                                                    <input className="form-control input-sm"
                                                        name="sgst"
                                                        value={this.state.sgst}
                                                        onChange={this.handleChange}
                                                        required={true} />
                                                </td>
                                                <td >
                                                    <label>IGST</label>
                                                    <input className="form-control input-sm"
                                                        name="igst"
                                                        value={this.state.igst}
                                                        onChange={this.handleChange}
                                                        required={true} />
                                                </td>


                                            </tr>
                                            <tr>
                                                <td width="20%">
                                                    <label>Tax</label>
                                                </td>
                                                <td width="80%" colSpan="3">

                                                    <input className="form-control input-sm"
                                                        type="text"
                                                        name="tax"
                                                        onChange={this.handleChange}
                                                        value={this.state.tax}

                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="20%">
                                                    <label>Total</label>
                                                </td>
                                                <td width="80%" colSpan="3">

                                                    <input className="form-control input-sm"
                                                        type="text"
                                                        name="total"
                                                        onChange={this.handleChange}
                                                        value={this.state.total}

                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="20%">
                                                    <label>IMEI</label>
                                                </td>
                                                <td width="80%" colSpan="3">

                                                    <input className="form-control input-sm"
                                                        type="text"
                                                        name="imei_temp"
                                                        onChange={this.handleChange}
                                                        onBlur={this.handleIMEI}
                                                        value={this.state.imei_temp}
                                                        placeholder="Scan IMEI Here"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>

                                                <td width="20%">
                                                    <label>IMEI Stock</label>
                                                </td>
                                                <td width="80%" colSpan="3">
                                                    <input className="form-control input-sm"
                                                        type="text"
                                                        name="imei"
                                                        onChange={this.handleChange}
                                                        value={this.state.imei}
                                                    />
                                                </td>

                                            </tr>
                                            <tr>
                                                <td colSpan="4" align="right">
                                                    <br />
                                                    {this.state.edit ? <div>
                                                        <button type="submit" className="btn btn-primary btn-sm">Edit</button> &nbsp;
                                                        <button type="button" onClick={this.onCancelClick} className="btn btn-danger btn-sm">Cancel</button>
                                                    </div> : <button type="submit" className="btn btn-primary btn-sm">Add</button>}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </td>

                            <td width="5%">
                                &nbsp;
                                </td>

                            <td width="55%" style={{ margin: '20px', verticalAlign: 'top' }}>
                                <TempTable
                                    data={this.state.temp}
                                    onDelete={this.onDelete.bind(this)}
                                    onEditClick={this.onEditClick.bind(this)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <hr />
                <table width="100%">
                    <tbody>
                        <tr>
                            <td>
                                <label>Bill Total</label>
                                <input
                                    className="form-control input-sm"
                                    name="bill_total"
                                    value={this.state.bill_total}
                                    onChange={this.handleChange}
                                    readOnly={true} />
                            </td>
                            {/* <td>
                                <label>CGST(%)</label>
                                <input className="form-control input-sm"
                                    name="cgst"
                                    value={this.state.cgst}
                                    onChange={this.handleChange} />
                            </td>
                            <td>
                                <label>SGST(%)</label>
                                <input className="form-control input-sm"
                                    name="sgst"
                                    value={this.state.sgst}
                                    onChange={this.handleChange} />
                            </td>
                            <td>
                                <label>IGST(%)</label>
                                <input className="form-control input-sm"
                                    name="igst"
                                    value={this.state.igst}
                                    onChange={this.handleChange} />
                            </td>
                            <td>
                                <label>Tax</label>
                                <input className="form-control input-sm"
                                    name="tax"
                                    value={this.state.tax}
                                    onChange={this.handleChange}
                                    readOnly={true} />
                            </td> */}
                            <td>
                                <label>Special Discount</label>
                                <input className="form-control input-sm"
                                    name="sp_discount"
                                    value={this.state.sp_discount}
                                    onChange={this.handleChange} />
                            </td>
                            <td>
                                <label>Round Off</label>
                                <input className="form-control input-sm"
                                    name="roff"
                                    value={this.state.roff}
                                    onChange={this.handleChange} />
                            </td>
                            <td>
                                <label>Grand Total</label>
                                <input className="form-control input-sm"
                                    name="gtot"
                                    value={this.state.gtot}
                                    onChange={this.handleChange}
                                    readOnly={true} />
                            </td>
                        </tr>

                        <tr style={{ height: '40px' }}>
                            <td colSpan="8" align="right">
                                <button type="button" className="btn btn-sm" onClick={this.handleFinalSubmit}>Update</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
