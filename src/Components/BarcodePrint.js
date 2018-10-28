import React, { Component } from 'react';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';


class BarcodePrintOne extends Component {
    render() {
        let i = [];
        for (let j = 0; j < this.props.nos; j++) {
            i.push(<div>
                <div className="barcode-style">
                    <Barcode value={this.props.bar} />
                </div>
                <p className="page-breaks"></p>
            </div>)
        }

        return (
            <div>
                {i}
            </div>
        )
    }
}




class BarcodePrint extends Component {
    
    render() {
        return (
            <div className="container">
                <h1>Printing {this.props.no_barcode} barcodes.... <span className="pull-right"><a onClick={this.props.onCloseClick}><i className="fa fa-times"></i></a></span></h1>

                <hr />

                <div align="center">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-primary btn-sm"><i className="fa fa-print"></i> Print</button>}
                        content={() => this.componentRef}
                    />
                    <hr />
                    <div className="barcode-viewer">
                        <BarcodePrintOne bar={this.props.bar} nos={this.props.no_barcode} ref={el => (this.componentRef = el)} />
                    </div>
                </div>
            </div>
        )
    }
}

export default BarcodePrint;

