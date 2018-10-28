import React, { Component } from 'react';
import {NavLink, Route, Switch} from 'react-router-dom';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import BrandInsert from '../Components/Master/Brands/BrandInsert';
import ProductInsert from '../Components/Master/Products/ProductInsert';
import CustomerInsert from '../Components/Master/Customers/CustomerInsert';
import SupplierInsert from '../Components/Master/Suppliers/SupplierInsert';
import UnitInsert from '../Components/Master/Units/UnitInsert';
import InitialsInsert from '../Components/Master/Initials/InitialsInsert';

class MasterContainer extends Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history} title="Masters" />
                <div className="main-body">

                    

                    <div className="container-fluid">

                        <ul className="nav nav-tabs">
                            <li><NavLink to="/master/initials" activeStyle={{ color: '#C0D52E' }}>Initials</NavLink></li>
                            <li><NavLink to="/master/unit" activeStyle={{ color: '#C0D52E' }}>Units</NavLink></li>
                            <li><NavLink to="/master/brand" activeStyle={{ color: '#C0D52E' }}>Brands</NavLink></li>
                            <li><NavLink to="/master/product" activeStyle={{ color: '#C0D52E' }}>Products</NavLink></li>
                            <li><NavLink to="/master/supplier" activeStyle={{ color: '#C0D52E' }}>Suppliers</NavLink></li>
                            <li><NavLink to="/master/customer" activeStyle={{ color: '#C0D52E' }}>Customers</NavLink></li>
                        </ul>

                        <div className="container-fluid">
                            <br />
                            <Switch>
                                <Route path="/master/initials" component={InitialsInsert} />
                                <Route path="/master/unit" component={UnitInsert} />
                                <Route path="/master/brand"  component={BrandInsert} />
                                <Route path="/master/product" component={ProductInsert} />
                                <Route path="/master/supplier" component={SupplierInsert} />
                                <Route path="/master/customer" component={CustomerInsert} />

                            </Switch>
                        </div>


                    </div>



                </div>
            </div>
        )
    }
}

export default withAuth(MasterContainer);