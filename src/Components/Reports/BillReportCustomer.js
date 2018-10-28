import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import CustomerWiseBill from './Tables/CustomerWiseBill';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { GetData, PostData } from './../../api/service';

class BillReportCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer_id: '',
            datefrom: '',
            dateto: '',
            type: 1,
            customer: [],
            results: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        GetData('/api/fetch_customer.php')
            .then((data) => {
                if (data.status === '200') {
                    this.setState({
                        customer: data.data,
                    })
                }
            });
    }

    handleSubmit(e) {
        e.preventDefault();

        const data = {
            customer_id: this.state.customer_id,
            date_from: this.state.datefrom,
            date_to: this.state.dateto,
            type: this.state.type
        }

        //post and fetch data

        PostData('/api/fetch_invoice_report_customer.php', data)
            .then((resp) => {

                if (resp.status === '200') {
                    this.setState({
                        results: resp.data
                    })
                }
            })
    }

    render() {
        let customer = this.state.customer;
        let i = [];
        if (customer.length > 0) {
            i = customer.map((el, index) =>
                <option key={index} value={el.customer_id}>{el.customer_name}</option>)
        }
        return (
            <div>
                <h2>Invoice Report (Customer Wise)</h2>
                <hr />

                <div className="container" align="center">
                    <form className="form-inline" onSubmit={this.handleSubmit}>

                        <div className="form-group">
                            <label>Type &nbsp;</label>
                            <select className="form-control input-sm"
                                name="type"
                                value={this.state.type}
                                onChange={this.handleChange}>
                                <option value="1">B2C</option>
                                <option value="2">B2B</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>&nbsp; Customer Name &nbsp;</label>
                            <select
                                className="form-control input-sm"
                                name="customer_id"
                                value={this.state.customer_id}
                                onChange={this.handleChange}
                            >
                                <option value="">Choose customer</option>
                                {i}
                            </select>
                        </div>


                        <div className="form-group">
                            <label>&nbsp; From &nbsp;</label>
                            <input
                                className="form-control input-sm"
                                type="date"
                                name="datefrom"
                                value={this.state.datefrom}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>&nbsp; To &nbsp;</label>
                            <input
                                className="form-control input-sm"
                                type="date"
                                name="dateto"
                                value={this.state.dateto}
                                onChange={this.handleChange}

                            />
                        </div>

                        <div className="form-group">

                            &nbsp;&nbsp;

                            <button className="btn btn-sm btn-primary" type="submit"><i className="fa fa-search"></i> Search</button>
                        </div>
                    </form>
                </div>
                <hr />
                <div align="center">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-primary btn-sm"><i className="fa fa-print"></i> Print</button>}
                        content={() => this.componentRef}
                    /> &nbsp;

                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="btn btn-sm btn-info"
                        table="table-to-xls"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Export to Excel" />
                </div>
                <hr />
                <CustomerWiseBill ref={el => (this.componentRef = el)} results={this.state.results} />
            </div>
        )
    }
}

export default BillReportCustomer;