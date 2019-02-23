import React, { Component } from 'react'
import InvoiceTable from './InvoiceTable';
import { GetData, PostData } from '../../../api/service';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Notifications, { notify } from 'react-notify-toast';

export default class FetchChallan extends Component {
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
            el.challan_no.toLowerCase().search(
                v.toLowerCase()) !== -1
        )

        this.setState({
            f_invoices: result
        })
    }

    componentDidMount() {
        GetData('/api/fetch_challan.php?type=1')
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

    deleteData(value, index) {
        //send the value now

        const data = {
            inv_no: value,
            type: this.state.type
        }

        PostData('/api/delete_challan.php', data)
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
                <h1>Challan</h1>
                <Notifications />
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
                        placeholder="Search By Challan Number"
                        style={{
                            width: '50%'
                        }}
                        name="search"
                        onChange={this.onChange}
                    />
                </div>
                <hr />
                <InvoiceTable
                    isLoading={this.state.isLoading}
                    data={this.state.f_invoices}
                    delete={this.onDeletePress.bind(this)}
                    type={this.state.type} />
            </div>
        )
    }
}
