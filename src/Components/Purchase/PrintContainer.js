import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import PrintPurchase from './PrintPurchase';

class PrintContainer extends Component {
    render() {
        return (
            <div>
                
        

                    <div className="container">
                        <h3>View Purchase Bills</h3>
                        <hr />
                        <div className="col-md-12" align="center">
                            <ReactToPrint
                                trigger={() => <button className="btn btn-primary btn-sm"><i className="fa fa-print"></i> Print</button>}
                                content={() => this.componentRef}
                            />
                            &nbsp;
                            <button className="btn btn-danger btn-sm" onClick={() => window.history.back()}><i className="fa fa-home"></i> Go Back</button>

                        </div>
                        <hr />

                   
                            <PrintPurchase id={this.props.match.params.id} ref={el => (this.componentRef = el)} />} />
                

    </div>
            </div>
        )
    }
}

export default PrintContainer;

