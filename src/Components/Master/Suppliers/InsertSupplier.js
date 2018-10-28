import React, { Component } from 'react'

class InsertSupplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplier_name: '',
            supplier_address: '',
            supplier_contact: '',
            supplier_email: '',
            supplier_gstin: '',
            supplier_state: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = this.state;
        this.props.setData(data);
        this.setState({
            supplier_name: '',
            supplier_address: '',
            supplier_contact: '',
            supplier_email: '',
            supplier_gstin: '',
            supplier_state: '',
        })
    }

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <h3>Insert Supplier</h3>
                    <hr />
                    <div className="form-group">
                        <label>Supplier Name</label>
                        <input
                            className="form-control input-sm"
                            placeholder="Supplier Name"
                            required={true}
                            name="supplier_name"
                            onChange={this.handleChange}
                            value={this.state.supplier_name} />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <textarea
                            className="form-control input-sm"
                            placeholder="Address"

                            name="supplier_address"
                            onChange={this.handleChange}
                            value={this.state.supplier_address} ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Contact No</label>
                        <input
                            className="form-control input-sm"
                            placeholder="Contact No"
                            required={true}
                            name="supplier_contact"
                            onChange={this.handleChange}
                            value={this.state.supplier_contact} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control input-sm"
                            placeholder="Email"
                            name="supplier_email"
                            onChange={this.handleChange}
                            value={this.state.supplier_email} />
                    </div>
                    <div className="form-group">
                        <label>Customer GSTIN</label>
                        <input
                            className="form-control input-sm"
                            placeholder="GSTIN"

                            name="supplier_gstin"
                            onChange={this.handleChange}
                            value={this.state.supplier_gstin} />
                    </div>
                    <div className="form-group">
                        <label>Customer State</label>
                        <input
                            type="text"
                            className="form-control input-sm"
                            placeholder="State"

                            name="supplier_state"
                            onChange={this.handleChange}
                            value={this.state.supplier_state} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-sm btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}


export default InsertSupplier;
