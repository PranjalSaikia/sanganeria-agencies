import React, { Component } from 'react'
import TempInputReturn from './comp/TempInputReturn';
import TempView from './comp/TempView';
import TempTable from './comp/TempTable';
import { GetData, PostData } from './../../api/service';
import InsertCutsomer from './Modal/InsertCustomer';
import InvoiceDetReturn from './comp/InvoiceDetReturn';

class SalesReturn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brands: [],
            products: [],
            mop: [],
            customers: [],
            temp: [],
            view: [],
            modal: false,
            fields: {
                billed_amount: '',
                cgst: '',
                cgst_p: '',
                gtot: '',
                igst: '',
                igst_p: '',
                sgst_p: '',
                tax: '',
                date_of_invoice: '',
                customer_id: '',
                mop: '',
                gtot: '',
                amount_paid: '',
                balance: '',
                place_of_supply: '',
                challan_no: '',
                date_of_challan: '',
                po_no: '',
                date_of_po: '',
                transporter: '',
                cheque_no: '',
                cheque_date: '',
                narration: ''
            },
            table_data: [],
            edit: false,
            edit_data: [],
            table_data: [],
            inn: ''
        }
    }

    _initialFetch() {
        GetData('/api/fetch_brand.php')
            .then((data) => {
                if (data.status === '200') {
                    this.setState({
                        brands: data.data,
                    })
                }
            });


        GetData('/api/fetch_products.php')
            .then((data) => {
                if (data.status === '200') {
                    this.setState({
                        products: data.data,
                    })
                }
            });

        GetData('/api/fetch_customer.php')
            .then((data) => {
                if (data.status === '200') {
                    this.setState({
                        customers: data.data,
                    })
                }
            });

        let initialTable = {
            main_data: '',
            table_data: []
        }
        localStorage.setItem('gtot', '0.00');
        localStorage.setItem('invoice_det', JSON.stringify(initialTable));
    }

    componentDidMount() {
        this._initialFetch();

    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this._initialFetch();
        }
    }

    handleTempData(data) {

        let temp = this.state.temp;
        temp.push(data);
        //console.log(temp);
        this.setState({
            temp: temp
        })
    }

    viewTable(data) {
        this.setState({
            view: data
        })
    }

    onDelete(index) {
        let temp = this.state.temp;
        temp.splice(index, 1);
        this.setState({
            temp: temp
        })
    }

    onSetData(data) {
        if (data.table_data.length > 0) {
            localStorage.setItem('invoice_det', JSON.stringify(data));
            localStorage.setItem('gtot', data.main_data.grand_tot_all);
        }

    }

    handleShowModal() {
        let modal = this.state.modal;
        if (modal === true) {
            this.setState({
                modal: false
            })
        } else {
            this.setState({
                modal: true
            })
        }

    }

    fetchCustomer() {
        GetData('/api/fetch_customer.php')
            .then((data) => {
                if (data.status === '200') {
                    this.setState({
                        customers: data.data,
                    })
                }
            });
    }

    finalSubmit(data) {
        //console.log(data)
        PostData('/api/generate_invoice_return.php', data)
            .then((resp) => {
                //console.log(resp);
                if (resp.status === '400') {
                    this.props.history.replace(`/printinvoicer/${resp.type}/${resp.data}`);
                }
            })
    }

    editData(data, index) {
        let temp = this.state.temp;
        temp.splice(index, 1);
        temp.push(data);
        this.setState({
            temp,
            edit: false,
            edit_data: []
        })
    }

    onCancel() {
        this.setState({
            edit: false,
            edit_data: []
        })
    }

    onEdit(el, index) {
        //        console.log(el)
        this.setState({
            edit_data: el,
            edit: true,
            inn: index
        })
    }

    render() {
        return (
            <div>
                <h3>Sales Return</h3>
                <div className="row">
                    <div className="col-md-4">
                        <TempInputReturn
                            brands={this.state.brands}
                            products={this.state.products}
                            sendData={this.handleTempData.bind(this)}
                            setTable={this.viewTable.bind(this)}
                            edit={this.state.edit}
                            edit_data={this.state.edit_data}
                            inn={this.state.inn}
                            editData={this.editData.bind(this)}
                            onCancel={this.onCancel.bind(this)} />
                    </div>

                    <div className="col-md-3">
                        <TempView data={this.state.view} />
                    </div>

                    <div className="col-md-5">
                        <TempTable
                            data={this.state.temp}
                            onDelete={this.onDelete.bind(this)}
                            onSetData={this.onSetData.bind(this)}
                            onEdit={this.onEdit.bind(this)} />
                    </div>
                </div>
                <hr />
                <div className="row">
                    <InvoiceDetReturn
                        customers={this.state.customers}
                        showModal={this.handleShowModal.bind(this)}
                        finalSubmit={this.finalSubmit.bind(this)} />
                    <InsertCutsomer show={this.state.modal} showModal={this.handleShowModal.bind(this)} fetchCustomer={this.fetchCustomer.bind(this)} />
                </div>
            </div>
        )
    }
}

export default SalesReturn;