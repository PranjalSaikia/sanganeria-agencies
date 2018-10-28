import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import DateWiseChallan from './Tables/DateWiseChallan';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class ChallanReportDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datefrom: '',
            dateto: '',
            results: [{
                challan_no: '',
                date1: '',
                truck_no: '',
                source: '',
                destination: '',
                gtot: ''
            }]
        }

    }

    render() {
        return (
            <div>
                <h2>Challan Report (Date Wise)</h2>
                <hr />

                <div className="container" align="center">
                    <form className="form-inline">
                        <div className="form-group">
                            <label>From &nbsp;</label>
                            <input
                                className="form-control input-sm"
                                type="date"

                            />
                        </div>

                        <div className="form-group">
                            <label>&nbsp; To &nbsp;</label>
                            <input
                                className="form-control input-sm"
                                type="date"


                            />
                        </div>

                        <div className="form-group">

                            &nbsp;&nbsp;

                            <button className="btn btn-sm btn-primary"><i className="fa fa-search"></i> Search</button>
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
                <DateWiseChallan ref={el => (this.componentRef = el)} state={this.state.result} />
            </div>
        )
    }
}

export default ChallanReportDate;