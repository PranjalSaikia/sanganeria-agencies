import React, { Component } from 'react'

class InsertCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer_name: '',
            customer_address: '',
            customer_contact: '',
            customer_email: '',
            customer_gstin: '',
            customer_state: '',
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
            customer_name: '',
            customer_address: '',
            customer_contact: '',
            customer_email: '',
            customer_gstin: '',
            customer_state: '',
        })
    }

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <h3>Insert Customer</h3>
                    <hr />
                    <div className="form-group">
                        <label>Customer Name</label>
                        <input
                            className="form-control input-sm"
                            placeholder="Customer Name"
                            required={true}
                            name="customer_name"
                            onChange={this.handleChange}
                            value={this.state.customer_name} />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <textarea
                            className="form-control input-sm"
                            placeholder="Address"
                            
                            name="customer_address"
                            onChange={this.handleChange}
                            value={this.state.customer_address} ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Contact No</label>
                        <input
                            className="form-control input-sm"
                            placeholder="Contact No"
                            required={true}
                            name="customer_contact"
                            onChange={this.handleChange}
                            value={this.state.customer_contact} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control input-sm"
                            placeholder="Email"
                            name="customer_email"
                            onChange={this.handleChange}
                            value={this.state.customer_email} />
                    </div>
                    <div className="form-group">
                        <label>Customer GSTIN</label>
                        <input
                            className="form-control input-sm"
                            placeholder="GSTIN"
                            
                            name="customer_gstin"
                            onChange={this.handleChange}
                            value={this.state.customer_gstin} />
                    </div>
                    <div className="form-group">
                        <label>Customer State</label>
                        <input
                            type="text"
                            className="form-control input-sm"
                            placeholder="State"
                            
                            name="customer_state"
                            onChange={this.handleChange}
                            value={this.state.customer_state} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-sm btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}


export default InsertCustomer;
