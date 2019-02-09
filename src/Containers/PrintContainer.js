import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import ReactToPrint from 'react-to-print';
import PrintInvoice from '../Components/Invoice/Print/PrintInvoice';
import PrintReturn from '../Components/Invoice/Print/PrintReturn';
import PrintChallan from '../Components/Challan/Print1/PrintChallan';

class PrintContainer extends Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history} title="Print Invoice" />
                <div className="main-body">

                    <div className="container">
                        <h1>Print</h1>
                        <hr />
                        <div className="col-md-12" align="center">
                            <ReactToPrint
                                trigger={() => <button className="btn btn-primary btn-sm"><i className="fa fa-print"></i> Print</button>}
                                content={() => this.componentRef}
                            />
                            &nbsp;
                            <button className="btn btn-danger btn-sm" onClick={()=>window.history.back()}><i className="fa fa-home"></i> Go Back</button>

                        </div>
                        <hr />

                        <Switch>
                            <Route exact path="/printinvoice/:type/:id" render={(props) => <PrintInvoice {...props} ref={el => (this.componentRef = el)} />} />
                            <Route exact path="/printchallan/:type/:id" render={(props) => <PrintChallan {...props} ref={el => (this.componentRef = el)} />} />
                            <Route exact path="/printinvoicer/:type/:id" render={(props) => <PrintReturn {...props} ref={el => (this.componentRef = el)} />} />
                        </Switch>

                    </div>
                </div>
            </div>
        )
    }
}

export default withAuth(PrintContainer);

