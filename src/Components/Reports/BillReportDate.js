import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import DateWiseBill from './Tables/DateWiseBill';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { PostData } from './../../api/service';

class BillReportDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datefrom: '',
            dateto: '',
            type: 0,
            mop: 0,
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

    handleSubmit(e) {
        e.preventDefault();

        const data = {
            date_from: this.state.datefrom,
            date_to: this.state.dateto,
            type: this.state.type,
            mop: this.state.mop
        }

        //post and fetch data

        PostData('/api/fetch_invoice_report.php', data)
            .then((resp) => {
                if (resp.status === '200') {
                    //console.log(resp.data)
                    this.setState({
                        results: resp.data
                    })
                }
            })
    }

    render() {
        return (
            <div>
                <h2>Invoice Report (Date Wise)</h2>
                <hr />

                <div className="container" align="center">
                    <form className="form-inline" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Type &nbsp;</label>
                            <select className="form-control input-sm"
                                name="type"
                                value={this.state.type}
                                onChange={this.handleChange}>
                                <option value="0">B2C</option>
                                <option value="1">B2B</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>&nbsp; From &nbsp;</label>
                            <input
                                className="form-control input-sm"
                                type="date"
                                name="datefrom"
                                onChange={this.handleChange}
                                value={this.state.datefrom}
                                required={true}
                            />
                        </div>

                        <div className="form-group">
                            <label>&nbsp; To &nbsp;</label>
                            <input
                                className="form-control input-sm"
                                type="date"
                                name="dateto"
                                onChange={this.handleChange}
                                value={this.state.dateto}
                                required={true}
                            />
                        </div>

                        <div className="form-group">
                            <label>&nbsp; Mode of Payment &nbsp;</label>
                            <select
                                className="form-control input-sm"
                                name="mop"
                                value={this.state.mop}
                                onChange={this.handleChange} >
                                <option value="0">All</option>
                                <option value="1">Cash</option>
                                <option value="2">Cheque</option>
                                <option value="3">Debit Card</option>
                                <option value="4">Finance</option>
                                <option value="5">Not Paid</option>
                            </select>
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
                <DateWiseBill ref={el => (this.componentRef = el)} results={this.state.results} type={this.state.type} />
            </div>
        )
    }
}

export default BillReportDate;