import React, { Component } from 'react'
import Notifications, { notify } from 'react-notify-toast';
import TempTable from './TempTable';
import { PostData } from '../../../api/service';

export default class PurchaseDet extends Component {
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
            discount: 0.00,
            roff: 0.00,
            gtot: 0.00,
            imei_temp: '',
            imei: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFinalSubmit = this.handleFinalSubmit.bind(this);
        this.handleChangeTotal = this.handleChangeTotal.bind(this);
    }

    _getInitial(){

        this.setState ({
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
            discount: 0.00,
            roff: 0.00,
            gtot: 0.00,
            imei_temp: '',
            imei: ''
        })
    }

    handleIMEI = (e) => {
        if(e.target.value !== ''){
            let imei = this.state.imei;
            imei = imei + e.target.value + ','
            this.setState({
                imei,
                imei_temp: ''
            })
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
            let cost = e.target.value;
            let qty = this.state.qty;
            if (qty === '') {
                qty = 0;
            }
            let total = parseFloat(qty) * parseFloat(cost);

            this.setState({
                qty: qty,
                total: total.toFixed(2)
            })
        }


        if (e.target.name === 'bill_total') {
            

        }

        if (e.target.name === 'cgst') {
            let cgst = e.target.value;
            let sgst = this.state.sgst;
            let igst = this.state.igst;

            let bill_total = this.state.bill_total;

            let cgst_a = parseFloat(cgst) * parseFloat(bill_total) / 100;
            let sgst_a = parseFloat(sgst) * parseFloat(bill_total) / 100;
            let igst_a = parseFloat(igst) * parseFloat(bill_total) / 100;

            let tax = cgst_a + sgst_a + igst_a;

            let discount = this.state.discount;
            let roff = this.state.roff;

            if(discount === ''){
                discount=0;
            }
            if(roff === ''){
                roff =0;
            }

            let gtot = parseFloat(bill_total) + parseFloat(tax) - parseFloat(discount) + parseFloat(roff);

            this.setState({
                tax: tax.toFixed(2),
                gtot: gtot.toFixed(2)
            })

        }

        if (e.target.name === 'sgst') {
            let sgst = e.target.value;
            let cgst = this.state.cgst;
            let igst = this.state.igst;

            let bill_total = this.state.bill_total;

            let cgst_a = parseFloat(cgst) * parseFloat(bill_total) / 100;
            let sgst_a = parseFloat(sgst) * parseFloat(bill_total) / 100;
            let igst_a = parseFloat(igst) * parseFloat(bill_total) / 100;

            let tax = cgst_a + sgst_a + igst_a;

            let discount = this.state.discount;
            let roff = this.state.roff;
            if (discount === '') {
                discount = 0;
            }
            if (roff === '') {
                roff = 0;
            }

            let gtot = parseFloat(bill_total) + parseFloat(tax) - parseFloat(discount) + parseFloat(roff);

            this.setState({
                tax: tax.toFixed(2),
                gtot: gtot.toFixed(2)
            })

        }
        if (e.target.name === 'igst') {
            let igst = e.target.value;
            let sgst = this.state.sgst;
            let cgst = this.state.cgst;

            let bill_total = this.state.bill_total;

            let cgst_a = parseFloat(cgst) * parseFloat(bill_total) / 100;
            let sgst_a = parseFloat(sgst) * parseFloat(bill_total) / 100;
            let igst_a = parseFloat(igst) * parseFloat(bill_total) / 100;

            let tax = cgst_a + sgst_a + igst_a;

            let discount = this.state.discount;
            let roff = this.state.roff;
            if (discount === '') {
                discount = 0;
            }
            if (roff === '') {
                roff = 0;
            }

            let gtot = parseFloat(bill_total) + parseFloat(tax) - parseFloat(discount) + parseFloat(roff);

            this.setState({
                tax: tax.toFixed(2),
                gtot: gtot.toFixed(2)
            })

        }
        if (e.target.name === 'discount') {
            let cgst = this.state.cgst;
            let sgst = this.state.sgst;
            let igst = this.state.igst;

            let bill_total = this.state.bill_total;

            let cgst_a = parseFloat(cgst) * parseFloat(bill_total) / 100;
            let sgst_a = parseFloat(sgst) * parseFloat(bill_total) / 100;
            let igst_a = parseFloat(igst) * parseFloat(bill_total) / 100;

            let tax = cgst_a + sgst_a + igst_a;

            let discount = e.target.value;
            let roff = this.state.roff;
            if (discount === '') {
                discount = 0;
            }
            if (roff === '') {
                roff = 0;
            }

            let gtot = parseFloat(bill_total) + parseFloat(tax) - parseFloat(discount) + parseFloat(roff);

            this.setState({
                tax: tax.toFixed(2),
                gtot: gtot.toFixed(2)
            })

        }
        if (e.target.name === 'roff') {
            let cgst = this.state.cgst;
            let sgst = this.state.sgst;
            let igst = this.state.igst;

            let bill_total = this.state.bill_total;

            let cgst_a = parseFloat(cgst) * parseFloat(bill_total) / 100;
            let sgst_a = parseFloat(sgst) * parseFloat(bill_total) / 100;
            let igst_a = parseFloat(igst) * parseFloat(bill_total) / 100;

            let tax = cgst_a + sgst_a + igst_a;

            let discount = this.state.discount;
            let roff = e.target.value;
            if (discount === '') {
                discount = 0;
            }
            if (roff === '') {
                roff = 0;
            }

            let gtot = parseFloat(bill_total) + parseFloat(tax) - parseFloat(discount) + parseFloat(roff);

            this.setState({
                tax: tax.toFixed(2),
                gtot: gtot.toFixed(2),
                
            })

        }
    }

    handleChangeTotal(total){
        let cgst = this.state.cgst;
        let sgst = this.state.sgst;
        let igst = this.state.igst;

        let bill_total = parseFloat(total);

        let cgst_a = parseFloat(cgst) * parseFloat(bill_total) / 100;
        let sgst_a = parseFloat(sgst) * parseFloat(bill_total) / 100;
        let igst_a = parseFloat(igst) * parseFloat(bill_total) / 100;

        let tax = cgst_a + sgst_a + igst_a;

        let discount = this.state.discount;
        let roff = this.state.roff;

        if (discount === '') {
            discount = 0;
        }
        if (roff === '') {
            roff = 0;
        }

        let gtot = parseFloat(bill_total) + parseFloat(tax) - parseFloat(discount) + parseFloat(roff);

        this.setState({
            tax: tax.toFixed(2),
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
            imei: this.state.imei
        }

        temp.push(data);

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
            imei: ''
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

    handleFinalSubmit(){
        const data = {
            entry_date: this.state.entry_date,
            supplier_id: this.state.supplier_id,
            purchase_bill: this.state.purchase_bill,
            purchase_bill_date: this.state.purchase_bill_date,
            bill_total: this.state.bill_total,
            cgst: this.state.cgst,
            sgst: this.state.sgst,
            igst: this.state.igst,
            tax: this.state.tax,
            discount: this.state.discount,
            roff: this.state.roff,
            gtot: this.state.gtot,
            table_data: this.state.temp
        }

        PostData('/api/purchase.php',data)
        .then((resp) => {
            if(resp.status === '200'){
                notify.show(resp.data,'success', 3000);
                this._getInitial();
            }else{
                notify.show(resp.data, 'error', 3000);
            }
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
                                <label>Entry Date</label>
                                <input className="form-control input-sm"
                                    type="date"
                                    name="entry_date"
                                    value={this.state.entry_date}
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
                <form onSubmit={this.handleSubmit}>
                    <table width="100%">
                        <tbody>
                            <tr>
                                <td width="10%">
                                    <label>Brand</label>
                                    <select className="form-control input-sm"
                                        name="brand_id"
                                        value={this.state.brand_id}
                                        onChange={this.handleChange}
                                        required={true} >
                                        <option value="">Choose</option>
                                        {i}
                                    </select>
                                </td>
                                <td width="15%">
                                    <label>Product</label>
                                    <select className="form-control input-sm"
                                        name="barcode"
                                        value={this.state.barcode}
                                        onChange={this.handleChange}
                                        required={true} >
                                        <option value="">Choose</option>
                                        {j}
                                    </select>
                                </td>
                                <td>
                                    <label>Qty</label>
                                    <input className="form-control input-sm"
                                        name="qty"
                                        value={this.state.qty}
                                        onChange={this.handleChange} />
                                </td>
                                <td>
                                    <label>Cost Price</label>
                                    <input className="form-control input-sm"
                                        name="cost"
                                        value={this.state.cost}
                                        onChange={this.handleChange}
                                        required={true} />
                                </td>
                                <td>
                                    <label>MRP</label>
                                    <input className="form-control input-sm"
                                        name="mrp"
                                        value={this.state.mrp}
                                        onChange={this.handleChange}
                                        required={true} />
                                </td>
                                <td>
                                    <label>Total</label>
                                    <input className="form-control input-sm"
                                        name="total"
                                        value={this.state.total}
                                        onChange={this.handleChange}
                                        required={true} />
                                </td>
                               
                            </tr>
                            <tr style={{marginTop: '50px'}}>
                                <td>
                                    <label>Scan IMEI Here</label>
                                    <input className="form-control input-sm"
                                        type="text"
                                        name="imei_temp"
                                        onChange={this.handleChange}
                                        onBlur={this.handleIMEI}
                                        value={this.state.imei_temp}
                                        placeholder="Scan IMEI Here"
                                    />
                                </td>
                                <td colSpan="4">
                                    <label>IMEI Stock</label>
                                    <input className="form-control input-sm"
                                        type="text"
                                        name="imei"
                                        onChange={this.handleChange}
                                        value={this.state.imei}
                                    />
                                </td>
                                <td><br />
                                    <button type="submit" className="btn btn-primary btn-sm">Add</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>

                <hr />
                <TempTable data={this.state.temp} onDelete={this.onDelete.bind(this)} />

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
                                    />
                            </td>
                            <td>
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
                            </td>
                            <td>
                                <label>Special Discount</label>
                                <input className="form-control input-sm"
                                    name="discount"
                                    value={this.state.discount}
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
                                <button type="button" className="btn btn-sm" onClick={this.handleFinalSubmit}>Submit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
