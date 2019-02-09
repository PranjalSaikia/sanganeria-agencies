import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { GetData } from './../../api/service';
import CurrentStockTable from './Tables/CurrentStockTable';
import Notifications, { notify } from 'react-notify-toast';

class CurrentStock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table_data: [],
            isLoading: true,
            f_table_data: []
        }
    }

    onChange = (e) => {

        let table_data = this.state.table_data;

        let v = e.target.value;

        let result = table_data.filter(el =>
            el.bar.toLowerCase().search(
                v.toLowerCase()) !== -1
        )

        this.setState({
            f_table_data: result
        })
    }

    componentDidMount() {
        GetData('/api/fetch_current_stock.php')
            .then((resp) => {
                if (resp.status === '200') {
                    this.setState({
                        table_data: resp.data,
                        f_table_data: resp.data,
                        isLoading: false
                    })
                } else {
                    notify.show('Something Went Wrong', 'error', 3000);
                }
            });
    }

    render() {
        return (
            <div>
                <Notifications />
                <h1>Current Stock</h1>

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
                        placeholder="Type barcode or scan here to search"
                        style={{
                            width: '50%'
                        }}
                        name="search"
                        onChange={this.onChange}
                    />
                </div>
               
                {this.state.isLoading ? null : <CurrentStockTable ref={el => (this.componentRef = el)} data={this.state.f_table_data} />}
            </div>
        )
    }
}

export default CurrentStock;