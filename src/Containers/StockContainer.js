import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import withAuth from './../auth_components/js/withAuth';
import Navbar from '../Components/Navbar';
import StockEntry from '../Components/Stock/StockEntry';
import CurrentStock from '../Components/Stock/CurrentStock';
import StockSheet from '../Components/Stock/StockSheet';
import Purchase from '../Components/Purchase/Purchase';
import PurchaseTable from '../Components/Purchase/PurchaseTable';
import PrintContainer from '../Components/Purchase/PrintContainer';
import PrintContainerR from '../Components/Return/PrintContainer';
import PurchaseEdit from '../Components/Purchase/PurchaseEdit';
import Return from '../Components/Return/Return';
import ReturnTable from '../Components/Return/ReturnTable';
import ReturnEdit from '../Components/Return/ReturnEdit';

class StockContainer extends Component {
    render() {
        return (
            <div>
                <Navbar history={this.props.history} title="Stock" />
                <div className="main-body">



                    <div className="container-fluid">

                        <ul className="nav nav-tabs">
                            <li><NavLink to="/stock/purchase" activeStyle={{ color: '#C0D52E' }}>Purchase</NavLink></li>
                            <li><NavLink to="/stock/purchasetable" activeStyle={{ color: '#C0D52E' }}>Purchase Table</NavLink></li>
                            <li><NavLink to="/stock/return" activeStyle={{ color: '#C0D52E' }}>Purchase Return</NavLink></li>
                            <li><NavLink to="/stock/returntable" activeStyle={{ color: '#C0D52E' }}>Return Table</NavLink></li>
                            <li><NavLink to="/stock/entry" activeStyle={{ color: '#C0D52E' }}>Stock Entry</NavLink></li>
                            <li><NavLink to="/stock/report" activeStyle={{ color: '#C0D52E' }}>Stock Sheet</NavLink></li>
                            <li><NavLink to="/stock/current" activeStyle={{ color: '#C0D52E' }}>Current Stock</NavLink></li>
                        </ul>

                        <div className="container-fluid">
                           
                            <Switch>
                                <Route path="/stock/purchase" component={Purchase} />
                                <Route path="/stock/return" component={Return} />
                                <Route path="/stock/purchasetable" component={PurchaseTable} />
                                <Route path="/stock/returntable" component={ReturnTable} />
                                <Route path="/stock/print/:id" component={PrintContainer} />
                                <Route path="/stock/printr/:id" component={PrintContainerR} />
                                <Route path="/stock/edit/:id" render={(props) => <PurchaseEdit {...props} history={this.props.history} />} />
                                <Route path="/stock/editr/:id" render={(props) => <ReturnEdit {...props} history={this.props.history}/>} />
                                <Route path="/stock/entry" component={StockEntry} />
                                <Route path="/stock/current" component={CurrentStock} />
                                <Route path="/stock/report" component={StockSheet} />

                            </Switch>
                        </div>


                    </div>



                </div>
            </div>
        )
    }
}

export default withAuth(StockContainer);