import React, { Component } from 'react'
import InvoiceTable from './InvoiceTable';
import {GetData, PostData} from './../../../api/service';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Notifications, { notify } from 'react-notify-toast';

export default class Fetchinvoices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoices: [],
            invoice_det: [],
            isLoading: true,
            type : 1
        }
        
    }

    componentDidMount(){
        GetData('/api/fetch_invoice.php?type=1')
        .then((resp) => {
            
            if(resp.status === '200'){
            
                this.setState({
                    invoices: resp.data,
                    isLoading: false,
                    type: this.state.type
                })
            }
        })
    }
    
    onDeletePress(value, index){
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

    deleteData(value, index){
        //send the value now

        const data = {
            inv_no: value,
            type: this.state.type
        }

        PostData('/api/delete_invoice.php', data)
        .then((resp) => {
            if(resp.status === '200'){
                notify.show(resp.data, 'success', 3000);
            }
        })

        let invoices  = this.state.invoices;
        invoices.splice(index, 1);
        this.setState({
            invoices: invoices
        })

    }
    render() {
    return (
      <div>
        <h1>Invoices (B2C)</h1>
        <Notifications />
        <hr/>
        <InvoiceTable isLoading={this.state.isLoading} data={this.state.invoices} delete={this.onDeletePress.bind(this)} type={this.state.type} />
      </div>
    )
  }
}
