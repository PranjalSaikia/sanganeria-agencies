import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import Sales from '../Components/Invoice/Sales';
import SalesReturn from '../Components/Invoice/SalesReturn';
import Fetchinvoices from '../Components/Invoice/Show/Fetchinvoices';
import FetchinvoicesR from '../Components/Invoice/Show/FetchInvoicesR';
import EditSales from '../Components/Invoice/EditSales';
import EditSalesReturn from '../Components/Invoice/EditSalesReturn';
import FetchinvoicesB from '../Components/Invoice/Show/FetchinvoicesB';
import FetchinvoicesRB from '../Components/Invoice/Show/FetchInvoicesRB';

class InvoiceContainer extends Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history} title="Invoice" />
                <div className="main-body">



                    <div className="container-fluid">

                        <ul className="nav nav-tabs">
                            <li><NavLink to="/invoice/sales" activeStyle={{ color: '#C0D52E' }}>Sales Invoice</NavLink></li>
                            <li><NavLink to="/invoice/return" activeStyle={{ color: '#C0D52E' }}>Return Invoice</NavLink></li>
                            <li><NavLink to="/invoice/1/table" activeStyle={{ color: '#C0D52E' }}>Invoices B2C</NavLink></li>
                            <li><NavLink to="/invoice/2/table" activeStyle={{ color: '#C0D52E' }}>Invoices B2B</NavLink></li>
                            <li><NavLink to="/invoice/1/rtable" activeStyle={{ color: '#C0D52E' }}>Return B2C</NavLink></li>
                            <li><NavLink to="/invoice/2/rtable" activeStyle={{ color: '#C0D52E' }}>Return B2B</NavLink></li>
                        </ul>

                        <div className="container-fluid">
                            <Switch>
                                <Route path="/invoice/sales" component={Sales} />
                                <Route path="/invoice/return" component={SalesReturn} />
                                <Route path="/invoice/edit/:type/:id" component={EditSales} />
                                <Route path="/invoice/editr/:type/:id" component={EditSalesReturn} />
                                <Route path="/invoice/1/table" component={Fetchinvoices} />
                                <Route path="/invoice/1/rtable" component={FetchinvoicesR} />
                                <Route path="/invoice/2/table" component={FetchinvoicesB} />
                                <Route path="/invoice/2/rtable" component={FetchinvoicesRB} />

                            </Switch>
                        </div>


                    </div>



                </div>
            </div>
        )
    }
}

export default withAuth(InvoiceContainer);