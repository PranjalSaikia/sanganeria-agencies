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
            isLoading: true
        }
    }

    componentDidMount(){
        GetData('/api/fetch_current_stock.php')
        .then((resp) => {
            if(resp.status === '200'){
                this.setState({
                    table_data: resp.data,
                    isLoading: false
                })
            }else{
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
                <hr />
                {this.state.isLoading ? null : <CurrentStockTable ref={el => (this.componentRef = el)} data={this.state.table_data} />}
            </div>
        )
    }
}

export default CurrentStock;