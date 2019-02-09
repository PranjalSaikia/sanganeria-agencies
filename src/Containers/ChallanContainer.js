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
import Challan from '../Components/Challan/Challan';
import FetchChallan from '../Components/Challan/Show1/FetchChallan';
import EditChallan from '../Components/Challan/EditChallan';
import ModifyChallan from '../Components/Challan/ModifyChallan';

class ChallanContainer extends Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history} title="Invoice" />
                <div className="main-body">



                    <div className="container-fluid">

                        <ul className="nav nav-tabs">
                            <li><NavLink to="/challan/sales" activeStyle={{ color: '#C0D52E' }}>Sales Challan</NavLink></li>
                            {/* <li><NavLink to="/challan/return" activeStyle={{ color: '#C0D52E' }}>Return Challan</NavLink></li> */}
                            <li><NavLink to="/challan/1/table" activeStyle={{ color: '#C0D52E' }}>Challans</NavLink></li>
                            {/* <li><NavLink to="/challan/2/table" activeStyle={{ color: '#C0D52E' }}>Returns</NavLink></li> */}
                        </ul>

                        <div className="container-fluid">
                            <Switch>
                                <Route path="/challan/sales" component={Challan} />
                                <Route path="/challan/return" component={SalesReturn} />
                                <Route path="/challan/edit/:type/:id" component={EditChallan} />
                                <Route path="/challan/editr/:type/:id" component={EditSalesReturn} />
                                <Route path="/challan/1/table" component={FetchChallan} />
                                <Route path="/challan/2/table" component={FetchinvoicesB} />
                                <Route path="/challan/:challan_no" component={ModifyChallan} />

                            </Switch>
                        </div>


                    </div>



                </div>
            </div>
        )
    }
}

export default withAuth(ChallanContainer);