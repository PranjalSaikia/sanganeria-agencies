import React, { Component } from 'react'
import { GetData, PostData } from './../../../api/service';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Notifications, { notify } from 'react-notify-toast';
import ReturnTable from './ReturnTable';
import ReactToPrint from 'react-to-print';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export default class FetchinvoicesR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoices: [],
            f_invoices: [],
            invoice_det: [],
            isLoading: true,
            type: 1
        }

    }

    onChange = (e) => {

        let table_data = this.state.invoices;

        let v = e.target.value;

        let result = table_data.filter(el =>
            el.inv_no.toLowerCase().search(
                v.toLowerCase()) !== -1
        )

        this.setState({
            f_invoices: result
        })
    }

    componentDidMount() {
        GetData('/api/fetch_invoice_return.php?type=0')
            .then((resp) => {

                if (resp.status === '200') {

                    this.setState({
                        invoices: resp.data,
                        f_invoices: resp.data,
                        isLoading: false,
                        type: this.state.type
                    })
                }
            })
    }

    onDeletePress(value, index) {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: this.deleteData.bind(this, value, index)
                },
                {
                    label: 'No',
                }
            ]
        })
    }

    deleteData(value, type, index) {
        //send the value now

        const data = {
            inv_no: value,
            type: type
        }

        PostData('/api/delete_invoice_return.php', data)
            .then((resp) => {
                if (resp.status === '200') {
                    notify.show(resp.data, 'success', 3000);
                }
            })

        let invoices = this.state.invoices;
        invoices.splice(index, 1);
        this.setState({
            invoices: invoices
        })

    }
    render() {
        return (
            <div>
                <h1>Return (B2C)</h1>
                <Notifications />
                <div align="center">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-primary btn-sm"><i className="fa fa-print"></i> Print</button>}
                        content={() => this.componentRef}
                    /> &nbsp;

                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="btn btn-sm btn-info"
                        table="table-to-xls"
                        filename={`Return-B2C`}
                        sheet="tablexls"
                        buttonText="Export to Excel" />
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '30px'
                }}>
                    <input
                        className="form-control input-sm"
                        placeholder="Search By Invoice Number"
                        style={{
                            width: '50%'
                        }}
                        name="search"
                        onChange={this.onChange}
                    />
                </div>
                <hr />
                <ReturnTable 
                    isLoading={this.state.isLoading} 
                    data={this.state.f_invoices} 
                    delete={this.onDeletePress.bind(this)} 
                    type={this.state.type}
                    ref={el => (this.componentRef = el)} />
            </div>
        )
    }
}
