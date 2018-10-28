import React, { Component } from 'react'

class InsertProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name: '',
            product_desc: '',
            brand_id: '',
            hsn: '',
            cgst: '',
            igst: '',
            sgst: '',
            model: '',
            unit: '',
            gst: '1',
            applicable: false,
            applicable_t: false,
            calculation: 'ON VALUE',
            taxability: '0',
            initial: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }



    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

        if (e.target.name === 'gst') {
            if (e.target.value === '1') {
                this.setState({
                    applicable: false
                })
            } else {
                this.setState({
                    applicable: true
                })
            }
        }


        if (e.target.name === 'taxability') {
            if (e.target.value === '0') {
                this.setState({
                    applicable_t: false
                })
            } else if (e.target.value === '1') {
                this.setState({
                    applicable_t: true
                })
            }
            else if (e.target.value === '2') {
                this.setState({
                    applicable_t: true
                })
            }
        }


        if (e.target.name === 'igst') {
            if (e.target.value !== '') {
                let igst = parseFloat(e.target.value);
                let cgst = igst / 2;
                let sgst = igst / 2;
                this.setState({
                    cgst: cgst,
                    sgst: sgst
                })
            } else {
                this.setState({
                    cgst: '',
                    sgst: ''
                })
            }

        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.state;
        this.props.setData(data);
        this.setState({
            brand_name: '',
            product_name: '',
            product_desc: '',
            brand_id: '',
            hsn: '',
            cgst: '',
            igst: '',
            sgst: '',
            model: '',
            unit: '',
            gst: '1',
            applicable: false,
            applicable_t: false,
            calculation: '',
            taxability: '0',
            initial: ''

        })
    }

    render() {
        let brands = this.props.brands;
        let i = [];
        if (brands.length > 0) {
            i = brands.map((el) =>
                <option key={el.brand_id} value={el.brand_id}>{el.brand_name}</option>
            )
        }

        let units = this.props.units;
        let j = [];
        if (units.length > 0) {
            j = units.map((el) =>
                <option key={el.unit_id} value={el.unit_name}>{el.unit_name}</option>
            )
        }


        let initials = this.props.initials;
        let k = [];
        if (initials.length > 0) {
            k = initials.map((el) =>
                <option key={el.id} value={el.bar}>{el.bar}</option>
            )
        }
        return (
            <div>
                <form className="form row" onSubmit={this.handleSubmit}>

                    <table width="100%" className="">
                        <tbody>
                            <tr style={{ height: '50px' }}>
                                <td width="25%">
                                    <div className="">
                                        <label>Select Brand &nbsp;</label>
                                        <select
                                            name="brand_id"
                                            className="form-control input-sm"
                                            onChange={this.handleChange}
                                            value={this.state.brand_id}
                                            required={true}
                                        >
                                            <option value="">Select Brand</option>
                                            {i}
                                        </select>
                                    </div>
                                </td>
                                <td width="25%">
                                    <div className="">
                                        <label>&nbsp; Product  &nbsp;</label>
                                        <input
                                            className="form-control input-sm"
                                            placeholder="Product Name"
                                            required={true}
                                            name="product_name"
                                            onChange={this.handleChange}
                                            value={this.state.product_name}
                                            required={true} />
                                    </div>
                                </td>
                                <td width="25%">

                                    <div className="">
                                        <label>&nbsp; Description &nbsp;</label>
                                        <input
                                            className="form-control input-sm"
                                            placeholder="Product Description (if any)"
                                            name="product_desc"
                                            onChange={this.handleChange}
                                            value={this.state.product_desc} ></input>
                                    </div>
                                </td>
                                <td width="25%">

                                    <div className="">
                                        <label>&nbsp; Model No &nbsp;</label>
                                        <input
                                            className="form-control input-sm"
                                            placeholder="Model No"
                                            required={true}
                                            name="model"
                                            onChange={this.handleChange}
                                            value={this.state.model}
                                            required={true} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td width="25%">


                                    <div className="">
                                        <label>&nbsp; Select Unit &nbsp;</label>
                                        <select
                                            name="unit"
                                            className="form-control input-sm"
                                            onChange={this.handleChange}
                                            value={this.state.unit}
                                            required={true}
                                        >
                                            <option value="">Select unit</option>
                                            {j}
                                        </select>
                                    </div>
                                </td>
                                <td>

                                    <div className="">
                                        <label> &nbsp;GST applicable &nbsp;</label>
                                        <select
                                            name="gst"
                                            className="form-control input-sm"
                                            onChange={this.handleChange}
                                            value={this.state.gst}
                                            required={true}
                                        >
                                            <option value="1">YES</option>
                                            <option value="0">NO</option>
                                        </select>
                                    </div>

                                </td>
                                <td>

                                    <div className="" >
                                        <label>&nbsp; HSN/SAC &nbsp;</label>
                                        <input
                                            className="form-control input-sm"
                                            placeholder="HSN/SAC"
                                            required={true}
                                            name="hsn"
                                            onChange={this.handleChange}
                                            value={this.state.hsn}
                                            required={true}
                                            readOnly={this.state.applicable} />
                                    </div>

                                </td>
                                <td>

                                    <div className="">
                                        <label>&nbsp; Calculation &nbsp;</label>
                                        <select
                                            name="calculation"
                                            className="form-control input-sm"
                                            onChange={this.handleChange}
                                            value={this.state.calculation}
                                            required={true}
                                            readOnly={this.state.applicable}
                                        >
                                            <option value="ON VALUE">ON VALUE</option>
                                            <option value="ON ITEM RATE">ON ITEM RATE</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td width="25%">

                                    <div className="">
                                        <label>&nbsp; Taxability &nbsp;</label>
                                        <select
                                            name="taxability"
                                            className="form-control input-sm"
                                            onChange={this.handleChange}
                                            value={this.state.taxability}
                                            required={true}
                                            readOnly={this.state.applicable}
                                        >
                                            <option value="0">Taxable</option>
                                            <option value="1">NIL Rated</option>
                                            <option value="2">Exempt</option>

                                        </select>
                                    </div>
                                </td>
                                <td>



                                    <div className="">
                                        <label>&nbsp; IGST (%) &nbsp;</label>
                                        <input
                                            className="form-control input-sm"
                                            placeholder="IGST (%)"
                                            required={true}
                                            name="igst"
                                            onChange={this.handleChange}
                                            value={this.state.igst}
                                            required={true}
                                            
                                            readOnly={this.state.applicable_t}
                                            readOnly={this.state.applicable} />
                                    </div>
                                </td>
                                <td>

                                    <div className="">
                                        <label>&nbsp; CGST (%) &nbsp;</label>
                                        <input
                                            className="form-control input-sm"
                                            placeholder="CGST (%)"
                                            required={true}
                                            name="cgst"
                                            onChange={this.handleChange}
                                            value={this.state.cgst}
                                            required={true}
                                            
                                            readOnly={this.state.applicable_t}
                                            readOnly={this.state.applicable} />
                                    </div>

                                </td>
                                <td>

                                    <div className="">
                                        <label>&nbsp; SGST (%) &nbsp;</label>
                                        <input
                                            className="form-control input-sm"
                                            placeholder="SGST (%)"
                                            required={true}
                                            name="sgst"
                                            onChange={this.handleChange}
                                            value={this.state.sgst}
                                            required={true}
                                            
                                            readOnly={this.state.applicable_t}
                                            readOnly={this.state.applicable} />
                                    </div>
                                </td>
                            </tr>

                            <tr style={{ height: '50px' }}>
                                <td width="25%">
                                    <div className="">
                                        <label>Select Barcode Type &nbsp;</label>
                                        <select
                                            name="initial"
                                            className="form-control input-sm"
                                            onChange={this.handleChange}
                                            value={this.state.initial}
                                            required={true}
                                        >
                                            <option value="">Select Initial</option>
                                            {k}
                                        </select>
                                    </div>
                                </td>
                                <td colSpan="3" align="right">
                                    <button className="btn btn-sm btn-primary">Submit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                </form>
            </div>
        )
    }
}


export default InsertProduct;
